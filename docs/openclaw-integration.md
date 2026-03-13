# OpenClaw 整合文件

## 概述

OpenClaw 是 Step1ne 的本地 AI 匹配服務，未來將提供智慧化的候選人-職缺配對功能。當求職者透過顧問個人頁面投遞履歷後，OpenClaw 可自動進行 AI 分析並推薦最適合的職缺。

## 架構

```
求職者投遞履歷
  → consultant-site POST /api/candidates
    → 獵頭系統 POST /api/candidates (建立候選人, status: "AI推薦")
      → OpenClaw 定期掃描新候選人
        → AI 分析候選人技能/經歷/偏好
        → 匹配系統內所有「招募中」職缺
        → PATCH /api/candidates/:id (更新 ai_match_result)
```

## API 端點設計

### 1. 新候選人通知 (Webhook)

```
POST /openclaw/candidates/new
```

獵頭系統在新增候選人時觸發，通知 OpenClaw 有新候選人需要匹配。

**Request Body:**

```json
{
  "candidateId": 123,
  "name": "王小明",
  "skills": "React, TypeScript, Node.js",
  "experience": "5年",
  "industry": "科技",
  "source": "顧問網站",
  "consultant": "Jacky Chen"
}
```

**Response:**

```json
{
  "success": true,
  "message": "候選人已排入匹配佇列",
  "queuePosition": 3
}
```

### 2. 單一候選人匹配

```
GET /openclaw/match/:candidateId
```

手動觸發單一候選人的 AI 匹配。

**Response:**

```json
{
  "success": true,
  "candidateId": 123,
  "matches": [
    {
      "jobId": 45,
      "score": 92,
      "reasoning": "技能高度匹配（React, TypeScript），產業經驗符合，年資超過要求",
      "matchedSkills": ["React", "TypeScript", "Node.js"],
      "missingSkills": ["GraphQL"],
      "recommendation": "強力推薦"
    }
  ],
  "processedAt": "2026-03-13T10:00:00Z"
}
```

### 3. 批次匹配

```
POST /openclaw/batch-match
```

批次觸發多個候選人的匹配。

**Request Body:**

```json
{
  "candidateIds": [123, 124, 125],
  "options": {
    "forceRefresh": false,
    "minScore": 50
  }
}
```

### 4. 匹配結果回寫

OpenClaw 完成匹配後，呼叫獵頭系統 API 回寫結果：

```
PATCH /api/candidates/:id
```

**Request Body:**

```json
{
  "ai_match_result": {
    "matches": [],
    "processedAt": "2026-03-13T10:00:00Z",
    "modelVersion": "openclaw-v1"
  },
  "status": "AI推薦"
}
```

## 資料流程

### 即時模式 (Webhook)

1. 求職者投遞履歷 → 獵頭系統建立候選人
2. 獵頭系統觸發 Webhook → POST /openclaw/candidates/new
3. OpenClaw 接收通知 → 排入匹配佇列
4. OpenClaw AI 匹配 → 分析候選人 vs 所有招募中職缺
5. 匹配完成 → PATCH /api/candidates/:id 回寫 ai_match_result
6. 顧問在獵頭系統看到 AI 推薦結果

### 定期掃描模式 (Polling)

1. OpenClaw 每 N 分鐘掃描獵頭系統
2. GET /api/candidates?status=AI推薦&has_match=false
3. 篩選出尚未匹配的候選人
4. 批次 AI 匹配
5. 回寫結果

## 設定

### 環境變數

```env
# OpenClaw 服務
OPENCLAW_URL=http://localhost:8080
OPENCLAW_API_KEY=your-api-key

# 獵頭系統 (OpenClaw 需要)
HEADHUNTER_API_URL=https://backendstep1ne.zeabur.app
HEADHUNTER_API_KEY=your-api-key
```

### 在獵頭系統啟用 Webhook

在 `routes-api.js` 的候選人建立端點加入：

```javascript
// POST /api/candidates 建立候選人後觸發 OpenClaw webhook
if (process.env.OPENCLAW_URL) {
  fetch(`${process.env.OPENCLAW_URL}/openclaw/candidates/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      candidateId: newCandidate.id,
      name: newCandidate.name,
      skills: newCandidate.skills,
      source: newCandidate.source,
      consultant: newCandidate.recruiter,
    }),
  }).catch(err => console.warn('OpenClaw webhook failed:', err.message));
}
```

## 目前狀態

- [ ] OpenClaw 核心 AI 匹配引擎開發
- [ ] Webhook 機制實作
- [x] 獵頭系統 `ai_match_result` JSONB 欄位已就位
- [x] 候選人 `status: "AI推薦"` 流程已定義
- [x] consultant-site 履歷投遞 → 獵頭系統 API 整合完成

## 非 AI 替代方案（已實作）

在 OpenClaw 上線前，consultant-site 已內建基於規則的職缺媒合工具：

- **技能匹配** (40%): Jaccard 相似度 + 同義詞對照
- **產業匹配** (25%): 完全匹配/相關產業/不同產業
- **地點匹配** (20%): 完全匹配/同區域/遠端友善
- **經歷匹配** (15%): 年資差距評分

此演算法位於 `lib/matching.ts`，無需 AI 服務即可運作。
