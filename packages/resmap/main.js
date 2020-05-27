'use strict';
let path = require("fire-path");
let fs = require("fire-fs");

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('resmap');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('resmap', 'resmap:hello');
    },
    'clicked' () {
      Editor.log('Button clicked!');
    },
    async 'query_assets' (event,params) {
      
      let dir = params.dirs;
      let ext = params.exts;
      let type = "";
      switch(ext) {
        case "prefab":
          type = 'prefab';
          break;
        case /\*\.jpg|png|jpeg|gif|$/.test(ext):
          type = 'texture';
          break;
        case /\*\.wav|mp3$/.test(ext):
          type = 'audio';
          break; 
        case "anim":
          type = 'animation'
          break;   
      }
      let projectPath = Editor.Project.path;

      let resConfig = {};
      if(dir instanceof Array && ext instanceof Array) {
        for(let i = 0; i < dir.length; i++) {
          for(let j = 0; j < ext.length; j++) {

            await new Promise((resolve,reject) => {
              Editor.assetdb.queryAssets(`db://assets/${dir[i]}\/**\/*.${ext[j]}`,type,(err,results) => {
                if(err) {
                  reject();
                  return;
                }
                if(results) {
                  // let jsonObj = {};
                  results.forEach((element,index) => {
                    let fileName = path.basename(element.url,`.${ext[j]}`) + `_${ext[j]}`;
                    let pathObj = {};
                    let filePath = element.url.replace(`db://assets/${dir[i]}/`,"");
                    pathObj.path = filePath;
                    pathObj.dir = dir[i];
                    resConfig[fileName] = pathObj;
                    // resConfig.dir = dir[i];
                  });
                  Editor.log("resConfig s ",resConfig);
                  resolve(resConfig);
                }
              });
      
            });

          }
        }
      }
      Editor.log("configObj is ",resConfig);

      
      // let data = new Uint8Array(Buffer.from(JSON.stringify(resConfig)));
      let configRealPath = 'db://assets/resconfig.ts';
      let configpath = Editor.assetdb.exists(configRealPath);
      Editor.log("configpath is ",configpath);
      if(!configpath) {

        Editor.assetdb.create(configRealPath,"export const ResConfig = " + JSON.stringify(resConfig),(err,results) => {
          Editor.log("创建资源完成");
        })

      } else {
        Editor.assetdb.saveExists(configRealPath,"export const ResConfig = " + JSON.stringify(resConfig),(err,meta) => {
          Editor.log("资源刷新完成");
        })
      }
    }
  },
};