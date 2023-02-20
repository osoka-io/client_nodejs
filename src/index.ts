/// <reference path="../dto/index.ts">
import { OsokaClient } from "./osoka-client.js";
import { WidgetRepository } from "./repository/widget-repository";

const version = '__lib_version__'; // Version will be injected on the build

export {version , OsokaClient , WidgetRepository}