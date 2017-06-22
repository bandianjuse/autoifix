'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';

export default class extends Base {
    indexAction(){
        return this.display();
    }
    async uploadAction() {
        let user = await this.session('userInfo');
        let userpath = user[0].id;
        let file = think.extend({}, this.file('file'));
        let suffix = file.headers['content-type'];
        if(suffix == 'image/jpeg' || suffix == 'image/jpg') suffix = '.jpg';
        if(suffix == 'image/png') suffix = '.png';
        if(suffix == 'image/gif') suffix = '.gif';
        let filepath = file.path;

        //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
        let uploadPath = think.RESOURCE_PATH + '/static/upload/'+ userpath;
        think.mkdir(uploadPath);
        let basename = path.basename(filepath);
        if(basename.indexOf('.') == -1){
            basename = basename + suffix;
        }

        fs.renameSync(filepath, uploadPath + '/' + basename);


        file.path = uploadPath + '/' + basename;

        if(think.isFile(file.path)){
            console.log('is file')
        }else{
            console.log('not exist')
        }


        this.success('/static/upload/'+ userpath + '/' + basename);
    }
}