export interface INotification
{
    type:string,
    message:string,
    data:any
}
export interface IMessage {
    sender: string|null;
    body: string|null;
  }