declare class ResponseDto {
  statusCode: number;
  errorCode?: number;
  errorMessage?: string;
}

declare class AuthRequestDto {
  account_id: number;
  secret: string;
}

declare class AuthResult {
  session_key: string;
  valid_until: number;
  session_id: string;
}

declare class AuthResponseDto extends ResponseDto {
  result: AuthResult;
}

declare class UploadRecordRequestDto {
  widget: string;
  kind: 'audio' | 'video';
  length: number;
  remote_id?: string;
}

declare class UploadRecordResponseDto extends ResponseDto {
  record_id: string;
}

declare class WidgetDto {
  id: string;
  name: string;
  site: string;
  max_record_count: number;
  work_from: number;
  work_until: number;
  calback_url: string;
  created_at: number;
  updated_at: number;
}

declare class WidgetUpdateRequestDto {
  id: string;
  name: string;
  site: string;
  max_record_count: number;
  work_from: number;
  work_until: number;
  calback_url: string;
  is_active: boolean;
}

declare class WidgetUpdateResponseDto extends ResponseDto {
  item: WidgetDto;
}

declare class WidgetDeleteRequestDto {
  id: string;
}

declare class ListResponseDto extends ResponseDto {
  skip: number;
  take: number;
  total: number;
}

declare class ListRequestDto {
  skip?: number;
  take?: number;
}

declare class WidgetListRequestDto extends ListRequestDto {
  withRemoved?: boolean;
}

declare class WidgetListResponseDto extends ListResponseDto {
  items: WidgetDto[];
}

declare class WidgetCreateRequestDto {
  name: string;
  site: string;
  max_record_count?: number;
  work_from?: number;
  work_until?: number;
  calback_url?: string;
}

declare class WidgetCreateResponseDto extends ResponseDto {
  item: WidgetDto;
}

export {
  AuthRequestDto,
  AuthResponseDto,
  UploadRecordRequestDto,
  UploadRecordResponseDto,
  WidgetCreateRequestDto,
  WidgetCreateResponseDto,
  WidgetDeleteRequestDto,
  WidgetDto,
  WidgetListRequestDto,
  WidgetListResponseDto,
  WidgetUpdateRequestDto,
  WidgetUpdateResponseDto
};
