import { Observable } from "rxjs/Rx";

export const APP_API_STATUS = 'APP_API_STATUS';
export const APP_ERROR_CODE = 'APP_ERROR_CODE';

const JSON_HEADER = new Headers({
    'Content-Type': 'application/json',
});

export function ActionException(action) {
    this.action = action;
    this.name = 'ActionException';
}

const actionAppStatus = (payload) => ({
    type: APP_API_STATUS,
    payload,
});

export function authError() {
    localStorage.clear();
    sessionStorage.clear();
    return APP_API_STATUS;
}

const handleRequestError = (err) => {
    if (err instanceof ActionException) {
        throw err;
    }
    if (navigator.onLine) {
        throw new ActionException(actionAppStatus(503));
    } else {
        throw new ActionException(actionAppStatus(420)); // net::ERR_INTERNET_DISCONNECTED
    }
};

export const fetchErrorEpic = (err) => Observable.of(err.action);

export const request = (action) => {
    const {
        method,
        url,
        // data,
        // options,
        download = false,
    } = action;
    return Observable.from(
        fetch(url, { method, JSON_HEADER }).then((response) => {
            if (response.status === 400) {
                // show not found
            } else if (response.status === 401) {
                throw new ActionException({
                    type: authError(),
                    payload: 401,
                });
            } else if (response.status >= 500) {
                throw new ActionException(actionAppStatus(response.status));
            }

            return response;
        })
    )
        .catch(handleRequestError)
        .mergeMap((res) => {
            if (download) {
                return Observable.from(res.blob());
            }
            return Observable.from(res.json());
        })
        .map((res) => {
            if (download) {
                return res;
            }
            if (res.code) {
                throw new ActionException({
                    type: APP_ERROR_CODE,
                    payload: res,
                });
            }
            return res;
        });
};
