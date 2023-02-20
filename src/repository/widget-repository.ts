import {OsokaClient} from "../osoka-client";
import {makeHeaders} from "../lib/make-headers";
import {dtoToGet} from "../lib/dto-to-get";
import {WidgetListRequestDto, WidgetListResponseDto} from "../dto";

export class WidgetRepository{
  constructor(private client:OsokaClient) {
  }

  async list(options:WidgetListRequestDto):Promise<WidgetListResponseDto>{
    const authHeader = await this.client.authHeader();
    const url = this.client.getRequestUrl('widget')
    const listRequest = await fetch(url+dtoToGet(options as Record<string, unknown>),{
      method:'GET',
      headers:{
        ...makeHeaders,
        ...authHeader
      },
    })
    return await listRequest.json() as WidgetListResponseDto;
  }
}