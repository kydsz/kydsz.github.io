export interface SkillGroup {
  name: string
  desc: string
}

export interface Project {
  name: string
  role: string
  time: string
  bg: string
  stack: string[]
  duties: string[]
  results: string[]
}

export const RESUME = {
  title: '后端开发 / AI 应用开发工程师',
  email: 'kydsz@qq.com',
  github: 'https://github.com/kydsz',
  intro:
    '2027 年本科毕业。熟练掌握 Go 后端开发与 LLM 应用开发，独立完成**多资产智能监测微服务系统**，并**全栈开发国家级大创教学评价系统**，熟悉微服务架构、LangGraph / RAG、限流缓存、认证鉴权与容器化部署。',
  skills: [
    {
      name: '后端开发',
      desc: '熟练掌握 **Go** 与 Gin / GORM，熟悉 Python / FastAPI，掌握 Java、C++ 基础，具备**微服务架构**（服务拆分 / 数据边界 / 内部接口鉴权）设计能力，了解常用设计模式（如 Go 的选项模式）',
    },
    {
      name: '数据与缓存',
      desc: '熟悉 MySQL / PostgreSQL 表设计与索引优化，以及 Redis 缓存、分布式锁、**Redis Stream 异步削峰**与死信处理，了解 Kafka 消息队列',
    },
    {
      name: 'LLM 应用',
      desc: '掌握 **LangGraph** 编排与 LangChain 工具链，熟悉 **RAG 检索增强**（ChromaDB / pgvector）、Function Calling 与 Prompt 工程，实现 **LLM 成本分层**与失败降级',
    },
    {
      name: '认证与安全',
      desc: '熟悉 JWT 认证与 **RBAC 权限模型**，有完整用户权限体系落地经验',
    },
    {
      name: '常用工具与效率',
      desc: '熟练使用 Git 版本控制与分支协作、Linux 常用命令与服务器运维、Docker / Docker Compose 容器化；熟练借助 AI 辅助完成代码编写、调试与学习',
    },
    {
      name: '部署与自动化',
      desc: '掌握 Nginx 反向代理与 **CI/CD 自动化**，可独立完成服务上线；掌握 **Ansible / Playbook 自动化运维**（Kubespray 部署 Kubernetes / k3s 集群）',
    },
  ] as SkillGroup[],
  projects: [
    {
      name: '多资产智能监测与通知系统',
      role: '个人项目',
      time: '2026.08 - 至今',
      bg: '**微服务架构**行情事件智能监测系统（加密货币 + A股）：**Go 核心 + Python 采集 + Python 分析**三服务，底层 PostgreSQL 16 + Redis 7，内置 **LangGraph LLM 流水线与 RAG 检索增强**，Docker Compose 编排，实现行情采集、智能分析、个性化通知端到端自动化。',
      stack: ['Go', 'chi', 'pgx', 'Python', 'LangGraph', 'RAG', 'PostgreSQL 16', 'Redis 7', 'Docker Compose'],
      duties: [
        '设计**微服务边界与数据所有权**：核心拥有业务表、分析自有库自建 RAG 向量、采集无 DB；行情连续量写 Redis、事件离散量落库（写入路径分离），物理拆分仅需替换连接串',
        '通过**连续 / 离散量分离**解耦成本：心跳仅刷新 Redis 连续量、不再产生事件，异动跨阈值才进分析，LLM 调用频率与行情 tick 解耦',
        '搭建 **LangGraph 流水线**（市场上下文 → RAG 检索 → LLM / 规则降级 → 置信度校准）+ **LLM 成本分层**（紧急 fast / 批量仅高风险走深度模型）',
        '实现 LLM 用量记账（单一写者入库、tiktoken 离线兜底估算）、运行时配置（数据库覆盖环境变量、保存即生效免重启）、双服务 Prometheus /metrics 与失败指数退避死信',
        '扩展 A股资产类别：资产类型一等化（现货 / 合约 / A股），自选与持仓统一建模、行情独立接入；LangGraph 按类别分派**分析子代理**（加密 / A股 persona）；支持财经日历 + 情景假设分析（覆盖全部自选、LLM 优先规则降级）',
        '实现自选驱动的智能通知：事件按相关性路由到自选/持仓用户，持仓感知影响由通知端确定性计算（方向/浮盈亏/距清算）、**价值门控**抑制无影响推送——零额外 LLM 成本',
      ],
      results: [
        '交付三服务微服务系统，多采集源（快讯 / 行情 / 宏观 / 财经日历 / A股行情 / 金十数据）支持加密与 A股双资产类别，端到端自动分析并分级通知，LLM 成本随行情频率可控',
      ],
    },
    {
      name: '教学评价系统',
      role: '国家级大创项目',
      time: '2026.03 - 至今',
      bg: '全校教学评价系统：**Go + Gin + GORM** 后端 + **React 18 + TypeScript** 前端，支持多角色评教、教务数据同步、统计导出，已上线运行。',
      stack: ['Go', 'Gin', 'GORM', 'React 18', 'TypeScript', 'MySQL', 'Redis', 'Docker'],
      duties: [
        '用 Go（Gin + GORM）开发后端，实现 JWT + **RBAC 动态权限**（系统管理员 / 学院管理员 / 督导 / 教师多角色，权限码粒度）',
        '实现**高并发评价提交异步落库削峰**：Redis Stream 先入队秒回成功、后台批量落库，避免集中评教时 MySQL 行锁打满连接池，并做**死信保护**（超阈值 / 超时挪入死信流、可一键重放）',
        '实现教务数据自动同步（增量 + 版本管理）、动态评教维度配置与多维度 XLSX / PDF 导出，并用 React 18 + TS 开发前端',
        '补齐**会话与下载安全**：会话 epoch 即时撤销（改密/禁用即踢下线）、登录接口限流、附件/PDF 图片安全下载',
      ],
      results: [
        '系统**上线运行**，服务全校教职工；对接学校真实教务数据（教职工档案 2100+ 条），成为常态化评教工具',
        '通过 Redis Stream 削峰与死信保护，保障集中评教期间大批教职工同时提交时的稳定高并发写入',
      ],
    },
  ] as Project[],
  education: {
    major: '计算机科学与技术 · 本科',
    time: '2023.09 - 2027.06',
    note: '主修：数据结构与算法、操作系统、计算机网络、数据库原理、人工智能与应用等',
  },
  honors: [
    '大学生创新训练项目 3 项（含国家级 1 项）',
    '软件著作权 1 项',
    '蓝桥杯省赛一等奖',
    '蓝桥杯全国总决赛优秀奖',
  ],
}
