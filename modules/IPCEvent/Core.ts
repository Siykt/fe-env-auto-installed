export enum IPCEvent {
  // 下载文件
  DownloadFile = 'DownloadFile',
  DownloadFileError = 'DownloadFileError',
  DownloadFileComplete = 'DownloadFileComplete',
  DownloadFileProgress = 'DownloadFileProgress',
  DownloadFileCancel = 'DownloadFileCancel',

  // 执行命令
  Exec = 'Exec',
  ExecError = 'ExecError',
  ExecReply = 'ExecReply',
}
