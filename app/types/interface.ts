export interface ICamera {
  id: number;
  cam_id: string;
  camera_name: string;
  capture_server_name: string;
  capture_server_ip: string;
  latitude?: number;
  longitude?: number;
  installation?: string | null;
  type_mode?: string;
  kanri_inst?: string;
  kanri_office?: string;
  kanri_office_code?: string;
  code4?: string;
  kanri_branch?: string | null;
  addr_zip?: string | null;
  addr_pref?: string;
  addr_city?: string;
  addr_town?: string;
  rosenkind?: string;
  rosen?: string;
  jouge?: string;
  kilopost?: number;
  sisetukind?: string | null;
  sisetu?: string | null;
  uri?: string;
  capture_interval?: number;
  encoderate?: string;
  fetch_enabled: boolean;
  stream_ftp_upload_enabled: boolean;
  snapshot_resolution?: string;
  deleted: boolean;
  deleted_from_meta: boolean;
  is_present_in_meta?: boolean;
  meta_sync?: boolean;
  access_and_preset_info: AccessAndPresetInfo;
  fetch_status_info: FetchStatusInfo;
  upload_status_info: UploadStatusInfo[];
  latest_upload?: string;
  stream_status?: boolean;
  ftp_transfer?: boolean;
}

export interface AccessAndPresetInfo {
  cam_id: string;
  capture_server_name?: string;
  ptz_preset?: string | null;
  ptz_correction_enabled: boolean;
  ptz_error_status?: string | null;
  ptz_error_title?: string | null;
  ptz_error_description?: string | null;
  camera_code?: string;
  camera_ip?: string;
  camera_port?: number;
}

export interface FetchStatusInfo {
  id: number;
  cam_id: string;
  capture_server_name: string;
  current_ptz?: string | null;
  interlaced_mode?: boolean;
  stream_payload_type?: number;
  fetch_status: number;
  fetch_status_desc: string;
  fetch_status_desc_jp: string;
  last_update_time: string;
}

export interface UploadStatusInfo {
  ftp_instance_name: string;
  ftp_server_name_en: string;
  ftp_server_name_jp: string;
  ftp_server_id: number;
  upload_status: number;
  upload_enabled: boolean;
  upload_status_code?: number | null;
  upload_status_description?: string | null;
  upload_status_description_jp?: string | null;
  last_update_time: string;
}
