import modelBuilder from "../builders/modelBuilder";
import { configToolbarModel } from "../models/configToolbarModel";
import configExamer from "./configExamer";

export default class configRepository
{ 
    constructor(config) {
        if (!configExamer(config)) {
            return false;
        }
        this.config = config;
        this.modelBuilder = new modelBuilder();
    }

    getToolbars() {
        if (this.config.toolbars) {
            return this.modelBuilder.build(configToolbarModel, this.config.toolbars);
        } else {
            return null;
        }
    }
    
    getToolGroups() {
        if (this.config.toolbars) {
            var list = [];

            for (let mode in this.config.toolbars) {
                for (let toolbar in this.config.toolbars[mode]) {
                    for (let toolGroup of this.config.toolbars[mode][toolbar]) {
                        list.push(toolGroup['name']);
                    }
                }
            }

            return list;
        } else {
            return null;
        }
    }

    getTools(toolbar) {
        if (!(toolbar in this.config.tools)) {
            return null;
        }

        var tools = {};
        for (let key in this.config.tools[toolbar]) {
            if (Object.keys(this.config.tools[toolbar][key]) == 0) {
                continue;
            }

            tools[key] = this.config.tools[toolbar][key];
        }

        return tools;
    }
}