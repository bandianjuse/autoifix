import Request from 'request';

export default class extends think.service.base {
    init(http){
        super.init(http);
    }


    /**
     * 网络请求
     */
    requestPost(params) {
        let requestPromise = think.promisify(Request.post, Request);
        return requestPromise(params);
    }

}