import {makeHeaders} from "./lib/make-headers";
import * as crypto from 'crypto';
import {AuthResponseDto} from "./dto";

const secrets: WeakMap<OsokaClient, string> = new WeakMap();

const MAX_TIME_DRIFT = 10; // in seconds

export class OsokaClient {
  private sessionKey: string = '';
  private sessionId: string = '';
  private validUntil: number = 0;
  private refreshAt: number = 0;


  /**
   *
   * @param accountId Your osoka.io account id. See https://app.osoka.io/manage/profile
   * @param secret Your secret key. See See https://app.osoka.io/manage/profile/secrets
   * @param apiVersion *Optional* API version
   * @param apiHost *Optional* Osoka.io API backend path. You can set it to "dev.osoka.io" to use beta version with your own risk.
   */
  constructor(
    private readonly accountId: number,
    secret: string,
    private readonly apiVersion: number = 1,
    private readonly apiHost: string = 'dev.osoka.io') {
    secrets.set(this, secret);
  }

  private async login() {
    const loginResponse = await fetch(this.getRequestUrl('auth'), {
      method: 'POST',
      headers: makeHeaders,
      body: JSON.stringify({
        secret: secrets.get(this),
        account_id: this.accountId
      })
    });
    const loginData = await loginResponse.json() as AuthResponseDto;
    if (loginData.statusCode !== 200) {
      throw new Error(`#${loginData.errorCode}:${loginData.errorMessage}`);
    }
    const now = (Date.now() / 1000) | 0;
    const delta = now - this.validUntil;
    this.refreshAt = this.validUntil - delta - MAX_TIME_DRIFT;
    this.sessionKey = loginData.result.session_key;
    this.sessionId = loginData.result.session_id;
    this.validUntil = loginData.result.valid_until;
  }

  async authHeader(): Promise<{auth:string}> {
    const now = (Date.now() / 1000) | 0;
    if (now >= this.refreshAt) {
      await this.login();
    }
    const input = `${this.validUntil}.${this.sessionId}.${now}.${this.sessionKey}`;
    const sign = crypto.createHash('sha256').update(input).digest('hex');
    return {auth:`v0_osoka(${this.sessionId}.${now}.${sign})`};
  }

  getRequestUrl(module:string,method?:string){
    let url = `https://${this.apiHost}/api/v${this.apiVersion}/${module}`;
    return (method)?url+ `/${method}`:url;
  }
}