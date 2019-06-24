import Taro from '@tarojs/taro';
import { TOKENINGO, LoginUrl, ApiBaseUrl, ClientKey } from './constant';

// 后端是否支持json格式
//const contentType = 'application/x-www-form-urlencoded';
// const contentType = 'application/json'

class Fetch {
  get(url, data = null) {
    return this.requestHandle('GET', url, data);
  }

  post(url, data) {
    return this.requestHandle('POST', url, data);
  }

  del(url, data = null) {
    return this.requestHandle('DELETE', url, data);
  }

  put(url, data) {
    return this.requestHandle('PUT', url, data);
  }

  login(data) {
    return this.loginHandle(data);
  }

  async requestHandle(method, url, data) {
    return new Promise(async (resolve, reject) => {
      this._showProgress();
      try {
        const tokenInfo = Taro.getStorageSync(TOKENINGO) || '';

        const res = await Taro.request({
          url: encodeURI(ApiBaseUrl + url),
          method,
          data, // 可以自己定义一些公共的参数，比如token,session
          header: {
            'Content-Type': 'application/json',
            Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
          },
        });
        this._hideProgress();
        debugger
        switch (res.statusCode) {
          case 200:
            {
              if (res.data.success) {
                return resolve(res.data.data);
              } else {
                this._showToast(res.data.errMsg);
                // reject(new Error(res.data.Message));
                return resolve(res.data.success);
              }
            }
            break;
          case 401: {
            return this.refreshHandle(method, url, data, reject);
          }
          case 500:
            {
              this._showToast(res.data.Message);
              reject(new Error(res.data.Message));
            }
            break;
        }
      } catch (error) {
        this._hideProgress();
        this._showToast('数据请求失败');
        reject(new Error('数据请求失败'));
      }
    });
  }

  async loginHandle(data) {
    return new Promise(async (resolve, reject) => {
      this._showProgress();
      try {
        const res = await Taro.request({
          url: encodeURI(LoginUrl),
          method: 'POST',
          header: {
            Authorization: 'Basic ' + ClientKey,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: {
            ...data,
            grant_type: 'weappshopman',
            scope: 'offline_access mc.pos.api',
          },
        });
        this._hideProgress();
        switch (res.statusCode) {
          case 200: {
            return resolve(res.data);
          }
          default: {
            this._showToast(res.data.error_description);
            reject(new Error(res.data.error_description));
            Taro.reLaunch({
              url: '/pages/login/index',
            });
          }
        }
      } catch (error) {
        this._hideProgress();
        this._showToast('数据请求失败');
        reject(new Error('数据请求失败'));
      }
    });
  }

  refreshHandle(method, url, data, reject) {
    const tokenInfo = Taro.getStorageSync(TOKENINGO) || '';
    Taro.request({
      url: encodeURI(LoginUrl),
      data: {
        grant_type: 'refresh_token',
        refresh_token: tokenInfo.refresh_token,
      },
      method: 'POST',
      dataType: 'json',
      header: {
        Authorization: 'Basic ' + ClientKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(
      (res) => {
        if (res.statusCode === 200) {
          Taro.setStorageSync(TOKENINGO, res.data);
          switch (method) {
            case 'GET':
              {
                this.get(url);
              }
              break;
            case 'POST':
              {
                this.post(url, data);
              }
              break;
            case 'DELETE':
              {
                this.del(url);
              }
              break;
            case 'PUT':
              {
                this.put(url, data);
              }
              break;
          }
        } else {
          this._showToast('登录失败');
          reject(new Error('登录失败'));
          Taro.reLaunch({
            url: '/pages/login/index',
          });
        }
      },
      (error) => {
        console.log(error);
        reject(error);
        Taro.reLaunch({
          url: '/pages/login/index',
        });
      },
    );
  }

  _showProgress() {
    Taro.showNavigationBarLoading();
    //Taro.showLoading();
  }

  _hideProgress() {
    Taro.hideNavigationBarLoading();
    //Taro.hideLoading();
  }
  _showToast(msg) {
    Taro.showToast({ title: msg, icon: 'none' });
  }
}
const fetch = new Fetch();
export default fetch;
