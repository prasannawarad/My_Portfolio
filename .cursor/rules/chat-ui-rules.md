# Chat UI Component Rules

## Design System

The chat widget must match the existing portfolio's **terminal-inspired** dark theme.

### Visual Specs

- **Chat button**: Fixed bottom-right, `right-6 bottom-6`. Circular, 56px. Use a message/chat icon.
- **Chat panel**: Slide-over from the right. Width `w-96` on desktop, full-width on mobile. Height `max-h-[600px]`.
- **Background**: Match the portfolio's dark bg (`bg-gray-900` or similar). Semi-transparent backdrop on panel.
- **Text**: User messages in a slightly lighter bubble, bot messages in a darker bubble. Monospace accent font for the bot name/header.
- **Accent color**: Pull from the existing portfolio theme (check Tailwind config for primary color).
- **Border**: Subtle border on the panel, rounded corners `rounded-2xl`.

### Animation

- Panel slides in from the right with a `transform transition-transform duration-300`.
- Messages fade in with a subtle slide-up animation.
- Typing indicator: 3 bouncing dots (CSS-only, no libraries).
- Chat button has a subtle pulse on first load to draw attention, then stops.

### Components Breakdown

#### `ChatWidget.jsx`
- Lazy-loaded via `React.lazy()` + `Suspense`.
- Manages open/close state.
- Renders the floating button + conditionally renders `ChatPanel`.
- Mounted in `Layout.jsx`.

#### `ChatPanel.jsx`
- Header: bot name ("Ask about Prasanna" or similar), close button.
- Message list: scrollable, auto-scrolls to bottom on new messages.
- Quick actions at the top of empty chat.
- Input at the bottom.
- Uses `useChat` hook for all state.

#### `ChatMessage.jsx`
- Props: `role` ("user" | "assistant"), `content`, `isLoading`.
- User messages: right-aligned, accent-colored bubble.
- Bot messages: left-aligned, darker bubble, with a small bot avatar/icon.
- Loading state: show animated dots.

#### `ChatInput.jsx`
- Text input (NOT textarea for v1 — single line is fine).
- Send button (icon). Disabled when empty or loading.
- Enter key submits. Shift+Enter does nothing special (single line).
- Max length enforced: 500 characters.

#### `QuickActions.jsx`
- Shown when chat history is empty.
- 4 preset buttons: "Tell me about Prasanna", "Show me projects", "What's the tech stack?", "How to contact?"
- Clicking sends the text as a user message.
- Disappears once any message is sent.

### Responsive Behavior

- **Desktop (>768px)**: Panel is 384px wide, floats in bottom-right corner.
- **Mobile (<768px)**: Panel is full-width, full-height overlay.
- Chat button stays fixed `z-50`.

### Accessibility

- Panel has `role="dialog"` and `aria-label`.
- Close button has `aria-label="Close chat"`.
- Focus traps inside the panel when open.
- Messages use `role="log"` on the container.
- Input has proper `aria-label`.
