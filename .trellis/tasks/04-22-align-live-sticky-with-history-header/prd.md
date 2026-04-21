# Align Live Sticky With History Header

## Goal

把 realtime 用户问题吸顶从“原气泡 wrapper sticky”统一为与 history 一致的 condensed sticky header，同时保留 realtime 只跟踪最后一条 ordinary user question 的语义。

## Requirements

- realtime 与 history 使用同一种 sticky header 视觉与 DOM 语义
- realtime 仍然只允许最后一条 ordinary user question 成为 sticky 候选
- history section handoff 规则保持不变
- restored history、window trimming、pseudo-user 过滤继续正确

## Acceptance Criteria

- [ ] realtime 不再渲染 `.messages-live-sticky-user-message`
- [ ] realtime/history 都通过同一条 sticky header 出口渲染
- [ ] trimmed live latest question 仍然可以驱动 sticky header
- [ ] `Messages.live-behavior.test.tsx` 通过

## Technical Notes

- Primary files:
  - `src/features/messages/components/Messages.tsx`
  - `src/features/messages/components/MessagesTimeline.tsx`
  - `src/features/messages/components/messagesLiveWindow.ts`
  - `src/styles/messages.css`
  - `src/styles/messages.history-sticky.css`
  - `src/features/messages/components/Messages.live-behavior.test.tsx`
