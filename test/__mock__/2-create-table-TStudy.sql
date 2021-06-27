USE TStudyTabCI;

CREATE TABLE [dbo].[TStudyTab] (
  [StudyKey] int  NOT NULL,
  [std_seq] tinyint  NULL,
  [StudyInsUID] nvarchar(64) COLLATE Thai_CI_AS  NULL,
  [PID] nvarchar(10) COLLATE Thai_CI_AS  NOT NULL,
  [PNAME] char(64) COLLATE Thai_CI_AS  NULL,
  [EngName] varchar(60) COLLATE Thai_CI_AS  NULL,
  [StudyID] nvarchar(16) COLLATE Thai_CI_AS  NULL,
  [StudyDesc] nvarchar(64) COLLATE Thai_CI_AS  NULL,
  [Modality] nvarchar(16) COLLATE Thai_CI_AS  NULL,
  [Bodypart] varchar(150) COLLATE Thai_CI_AS  NULL,
  [Room] char(10) COLLATE Thai_CI_AS  NULL,
  [StudyDate] datetime  NULL,
  [StudyTime] datetime  NULL,
  [AccessNum] nvarchar(16) COLLATE Thai_CI_AS  NULL,
  [PhysicianName] char(64) COLLATE Thai_CI_AS  NULL,
  [PatAge] nvarchar(12) COLLATE Thai_CI_AS  NULL,
  [SeriesCnt] int  NULL,
  [ImageCnt] int  NULL,
  [InsertDate] datetime  NULL,
  [InsertTime] datetime  NULL,
  [ArchStatus] int  NULL,
  [ExamStatus] int  NULL,
  [CompStatus] int  NULL,
  [Comments] nvarchar(64) COLLATE Thai_CI_AS  NULL,
  [DelFlag] int  NULL,
  [SendStatus] int  NULL,
  [SockStatus] int  NULL,
  [VerifyFlag] int  NULL,
  [VerifyTime] datetime  NULL,
  [AccessTime] nvarchar(8) COLLATE Thai_CI_AS  NULL,
  [AccessCnt] int  NULL,
  [FetchReqTime] nvarchar(14) COLLATE Thai_CI_AS  NULL,
  [Dept] nvarchar(20) COLLATE Thai_CI_AS  NULL,
  [ReportDate] nvarchar(12) COLLATE Thai_CI_AS  NULL,
  [ReportTime] nvarchar(12) COLLATE Thai_CI_AS  NULL,
  [ReportLoc] char(25) COLLATE Thai_CI_AS  NULL,
  [Report] nvarchar(4000) COLLATE Thai_CI_AS  NULL,
  [ReportDoctor] char(32) COLLATE Thai_CI_AS  NULL,
  [VerifyDoctor] char(32) COLLATE Thai_CI_AS  NULL,
  [PStatus] char(10) COLLATE Thai_CI_AS  NULL,
  [ReportDT] datetime  NULL,
  [ReceiveFlag] char(1) COLLATE Thai_CI_AS  NULL,
  [ReceiveDate] char(10) COLLATE Thai_CI_AS  NULL,
  [ReceiveTime] char(10) COLLATE Thai_CI_AS  NULL,
  [ReceiveBy] varchar(50) COLLATE Thai_CI_AS  NULL,
  [Amount] int  NULL,
  [Clinic] varchar(50) COLLATE Thai_CI_AS  NULL,
  [ChargeType] char(2) COLLATE Thai_CI_AS  NULL,
  [Charge] int  NULL,
  [NM] nvarchar(10) COLLATE Thai_CI_AS  NULL
);

CREATE TABLE [dbo].[risevent] (
  [StudyKey] int  NOT NULL,
  [PID] char(10) COLLATE Thai_CI_AS  NULL,
  [Category] nvarchar(20) COLLATE Thai_CI_AS  NULL,
  [Type] nvarchar(20) COLLATE Thai_CI_AS  NULL,
  [SubType] nvarchar(20) COLLATE Thai_CI_AS  NULL,
  [InsertTime] datetime  NULL,
  [EndTime] datetime  NULL,
  [UserLog] nvarchar(30) COLLATE Thai_CI_AS  NULL,
  [Comment] nvarchar(50) COLLATE Thai_CI_AS  NULL,
  [Amount] int  NULL,
  [Location] nvarchar(50) COLLATE Thai_CI_AS  NULL
);

CREATE NONCLUSTERED INDEX [IX_risevent] ON [dbo].[risevent] (
  [StudyKey] ASC
);

