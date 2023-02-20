import {OsokaClient} from "../osoka-client";
import {makeHeaders} from "../lib/make-headers";
import {dtoToGet} from "../lib/dto-to-get";
import {
  ResponseDto,
  WidgetCreateRequestDto,
  WidgetCreateResponseDto, WidgetDeleteRequestDto,
  WidgetListRequestDto,
  WidgetListResponseDto,
  WidgetUpdateRequestDto, WidgetUpdateResponseDto
} from "../dto";

export class WidgetController {
  constructor(private client:OsokaClient) {}

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

  async create(options:WidgetCreateRequestDto):Promise<WidgetCreateResponseDto>{
    const authHeader = await this.client.authHeader();
    const url = this.client.getRequestUrl('widget');
    const listRequest = await fetch(url,{
      method:'POST',
      body:JSON.stringify(options),
      headers:{
        ...makeHeaders,
        ...authHeader
      },
    })
    return await listRequest.json() as WidgetCreateResponseDto;
  }

  async update(options:WidgetUpdateRequestDto):Promise<WidgetUpdateResponseDto>{
    const authHeader = await this.client.authHeader();
    const url = this.client.getRequestUrl('widget');
    const listRequest = await fetch(url,{
      method:'PUT',
      body:JSON.stringify(options),
      headers:{
        ...makeHeaders,
        ...authHeader
      },
    })
    return await listRequest.json() as WidgetCreateResponseDto;
  }

  async delete(options:WidgetDeleteRequestDto):Promise<ResponseDto>{
    const authHeader = await this.client.authHeader();
    const url = this.client.getRequestUrl('widget');
    const listRequest = await fetch(url+dtoToGet(options as unknown as Record<string, unknown>),{
      method:'DELETE',
      headers:{
        ...makeHeaders,
        ...authHeader
      },
    })
    return await listRequest.json() as WidgetCreateResponseDto;
  }
}