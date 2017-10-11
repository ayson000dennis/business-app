export class MessageType {
  public static readonly MSG_REQ: string = "message_request";
  public static readonly MSG_RES: string = "message_response"
}

export interface ChatMessage {
  user_id: string;
  business_id: string;
  company_name: string;
  message: any;
  epoch?:number;
  message_by: string;
  is_read: boolean;
}

export interface ChatNotification {
  user_id: string;
  business_id: string;
}
