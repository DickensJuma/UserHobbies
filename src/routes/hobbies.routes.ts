/* tslint:disable */
import {
    Controller,
    ValidationService,
    FieldErrors,
    ValidateError,
    TsoaRoute,
  } from "tsoa";
  import { HobbiesController } from "../controllers/hobbies.controller";
  
  
  import * as express from "express";
  
  const models: TsoaRoute.Models = {
    Hobbies: {
      properties: {
        _id: { dataType: "string", required: true },
        name: { dataType: "string", required: true },
            year: { dataType: "string", required: true },
            passionLevel: { dataType: "string", required: true },

        
      },
    },
   
  };
  const validationService = new ValidationService(models);
  
  export function HobbiesRoutes(app: express.Express) {
    app.get("/hobbies", function (request: any, response: any, next: any) {
      const args = {};
  
      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }
  
      const controller = new HobbiesController();
  
      const promise = controller.getAll.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  
    app.post("/hobbies", function (request: any, response: any, next: any) {
      const args = {
        name: {
          in: "body-prop",
          name: "name",
          required: true,
          dataType: "string",
        },
        year: {
          in: "body-prop",
          name: "year",
          required: true,
          dataType: "string",
          },
          passionLevel: {
            in: "body-prop",
            name: "passionLevel",
            required: true,
            dataType: "string",
          },
      };
  
      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }
  
      const controller = new HobbiesController();
  
      const promise = controller.create.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
    
    app.put("/hobbies/:id", function (request: any, response: any, next: any) {
      const args = {
        id: { in: "path", name: "id", required: true, dataType: "string" },
        name: {
          in: "body-prop",
          name: "name",
          required: true,
          dataType: "string",
        },
        year: {
          in: "body-prop",
          name: "year",
          required: true,
          dataType: "string",
          },
          passionLevel: {
            in: "body-prop",
            name: "passionLevel",
            required: true,
            dataType: "string",
          },
      };
  
      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }
  
      const controller = new HobbiesController();
  
      const promise = controller.update.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
    
      
    app.delete("/hobbies/:id", function (request: any, response: any, next: any) {
      const args = {
        id: { in: "path", name: "id", required: true, dataType: "string" },
      };
  
      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }
  
      const controller = new HobbiesController();
  
      const promise = controller.remove.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  
  
  
    function isController(object: any): object is Controller {
      return (
        "getHeaders" in object && "getStatus" in object && "setStatus" in object
      );
    }
  
    function promiseHandler(
      controllerObj: any,
      promise: any,
      response: any,
      next: any
    ) {
      return Promise.resolve(promise)
        .then((data: any) => {
          let statusCode;
          if (isController(controllerObj)) {
            const headers = controllerObj.getHeaders();
            Object.keys(headers).forEach((name: string) => {
              response.set(name, headers[name]);
            });
  
            statusCode = controllerObj.getStatus();
          }
  
          if (data || data === false) {
            // === false allows boolean result
            response.status(statusCode || 200).json(data);
          } else {
            response.status(statusCode || 204).end();
          }
        })
        .catch((error: any) => next(error));
    }
  
    function getValidatedArgs(args: any, request: any): any[] {
      const fieldErrors: FieldErrors = {};
      const values = Object.keys(args).map((key) => {
        const name = args[key].name;
        switch (args[key].in) {
          case "request":
            return request;
          case "query":
            return validationService.ValidateParam(
              args[key],
              request.query[name],
              name,
              fieldErrors
            );
          case "path":
            return validationService.ValidateParam(
              args[key],
              request.params[name],
              name,
              fieldErrors
            );
          case "header":
            return validationService.ValidateParam(
              args[key],
              request.header(name),
              name,
              fieldErrors
            );
          case "body":
            return validationService.ValidateParam(
              args[key],
              request.body,
              name,
              fieldErrors,
              name + "."
            );
          case "body-prop":
            return validationService.ValidateParam(
              args[key],
              request.body[name],
              name,
              fieldErrors,
              "body."
            );
        }
      });
      if (Object.keys(fieldErrors).length > 0) {
        throw new ValidateError(fieldErrors, "");
      }
      return values;
    }
  }
  