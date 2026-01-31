// OpenAPI Backend Express server

import { OpenAPIBackend, Context } from "openapi-backend";
import { OpenAPIV3_1 } from "openapi-types";
import OpenAPIParser from "@readme/openapi-parser";
import Express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Logger } from "./helpers/logger.js";
import { icarBatchResultSeverityType } from "./enums/icarEnums.js";

// Import request handlers
import { getMilkingVisitsHandler } from "./paths/get-milking-visits.js";
import { getAnimalsHandler } from "./paths/get-animals.js";

// Read environment variables
dotenv.config();
const { URL_SCHEME_FILEPATH, PORT } = process.env;

Logger.info("URL scheme:", URL_SCHEME_FILEPATH)

// Validate URL scheme
OpenAPIParser.validate(URL_SCHEME_FILEPATH, (err, api) => {
  if (err) Logger.error(err);
  else Logger.info("API name: %s, Version: %s", api.info.title, api.info.version);
});

// Create server
const app = Express();
app.use(Express.json());

OpenAPIParser.dereference(URL_SCHEME_FILEPATH).then((urlScheme: OpenAPIV3_1.Document) => {
  urlScheme.servers[0].url = "/";
  const api = new OpenAPIBackend({
    definition: JSON.parse(JSON.stringify(urlScheme)),
    quick: true,
    validate: false,
  });
  api.init();

  // TODO: Register the rest of endpoints by operationId
  api.register("get-animals", getAnimalsHandler);
  api.register("get-milking-visits", getMilkingVisitsHandler);

  // Define endpoints that fail
  api.register("validationFail", (c: Context, req: Express.Request, res: Express.Response) =>
    res.status(StatusCodes.BAD_REQUEST).json({ errors: [{
      type: ReasonPhrases.BAD_REQUEST,
      severity: icarBatchResultSeverityType.Error,
      status: StatusCodes.BAD_REQUEST,
      detail: c.validation.errors
    }]})
  );
  api.register("notFound", (c: Context, req: Express.Request, res: Express.Response) =>
    res.status(StatusCodes.NOT_FOUND).json({ errors: [{
      type: ReasonPhrases.NOT_FOUND,
      severity: icarBatchResultSeverityType.Error,
      status: StatusCodes.NOT_FOUND
    }]})
  );

  // Mock responses for operations with no registered handlers
  // api.register("notImplemented", (c: Context, req: Express.Request, res: Express.Response) => {
  //   const { status, mock } = c.api.mockResponseForOperation(c.operation.operationId);
  //   return res.status(status).json(mock);
  // });
  // Or return "notImplemented"
  api.register("notImplemented", (c: Context, req: Express.Request, res: Express.Response) => {
    res.status(StatusCodes.NOT_IMPLEMENTED).json({ status: StatusCodes.NOT_IMPLEMENTED, error: ReasonPhrases.NOT_IMPLEMENTED })
  });

  // Validate responses too
  // api.register({
  //   postResponseHandler: (c: Context, req: Express.Request, res: Express.Response) => {
  //     const valid = c.api.validateResponse(c.response, c.operation);
  //     if (valid.errors) {
  //       // response validation failed
  //       return res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, err: valid.errors });
  //     }
  //     return res.status(StatusCodes.ACCEPTED).json(c.response);
  //   },  
  // })

  // Middleware to log incoming requests
  app.use((req: Express.Request, _res: Express.Response, next) => {
    if (!(req.originalUrl.endsWith(".css") || req.originalUrl.endsWith(".js") || req.originalUrl.endsWith(".png"))) {
      Logger.info(new Date(Date.now()).toISOString(),
        `Received request ${req.method} ${req.originalUrl} with ` +
        `parameters ${JSON.stringify(req.params)}, query ${JSON.stringify(req.query)} ` +
        `and body ${JSON.stringify(req.body)}`);
    }
    next();
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(urlScheme));

  app.use((req: Express.Request, res: Express.Response) => api.handleRequest(req, req, res));

  app.listen(PORT, () => Logger.info(`API listening to port ${PORT}`));
});
