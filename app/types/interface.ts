export interface IStatuses {
  ftp_server_id?: number;
  ftp_server_ip: string;
  ftp_server_name_en: string;
  ftp_server_name_jp: string;
  upload_status: number;
  upload_enabled: boolean;
  last_update_time: string;
  upload_status_description: string;
  upload_status_description_jp: string;
}

export interface IUploadStatus {
  capture_server_name: string;
  statuses: IStatuses[];
  stream_name: string;
}

export interface IFetchStatus {
  cam_id: string;
  capture_server_name: string;
  fetch_status: null | number;
  current_ptz: number
  id: number;
  last_update_time: string;
  fetch_status_desc: string;
  fetch_status_desc_jp: string;
}

export interface ICamera {
  created_time: string;
  image_url: string;
  IsImageFromHistory: boolean;
  id: number;
  stream_name: string;
  camera_name: string;
  capture_interval: number;
  access_and_preset_info: {
    ptz_error_title: string | null,
    capture_server_name: string,
    ptz_error_status: number | null,
    ptz_preset: number | null,
    ptz_error_description: string | null,
    ptz_correction_enabled: boolean,
    stream_name: string | null
    camera_code:string;
  },
  upload_status_info: IUploadStatus;
  fetch_status_info: IFetchStatus;
  display_name?:string,
  capture_server_name?: string;
  enabled?: boolean,
  latitude?: number;
  longitude?: number;
  cam_id: string;
  kanri_inst?: string;
  kanri_office?: string;
  kanri_branch?: string;
  addr_city?: string;
  addr_town?: string;
  rosenkind?: string;
  rosen?: string;
  kilopost?: number;
  sisetu?: string;
  stream_status?: boolean;
  ftp_transfer?: boolean;
  meta_sync?: boolean;
  deleted_from_meta?: boolean;
  fetch_enabled: boolean;
  latest_upload?: string;
  server_ip?: string;
  ftp_destination_enabled?:boolean;
  stream_ftp_upload_enabled?: boolean;
  jouge: string;
  capture_server_ip?: string;
  tags: string;
  missing_from_stream_meta: number;
}