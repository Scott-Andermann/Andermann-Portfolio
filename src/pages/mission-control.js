import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

const API_URL = "http://localhost:3001";

// ── Global styles scoped to this page ──────────────────────────────────────

const GlobalStyle = createGlobalStyle`
  body {
    background: #0d0d0d;
    color: #f0f0f0;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 15px;
    line-height: 1.5;
    min-height: 100vh;
  }
`;

// ── Colors ──────────────────────────────────────────────────────────────────

const C = {
  bg: "#0d0d0d",
  card: "#1a1a1a",
  card2: "#222222",
  border: "#2a2a2a",
  accent: "#7c3aed",
  accentHover: "#6d28d9",
  accentDim: "rgba(124, 58, 237, 0.15)",
  text: "#f0f0f0",
  muted: "#888",
  success: "#22c55e",
  danger: "#ef4444",
};

// ── Keyframes ────────────────────────────────────────────────────────────────

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// ── Shared input style ───────────────────────────────────────────────────────

const inputBase = `
  width: 100%;
  background: ${C.card2};
  border: 1px solid ${C.border};
  border-radius: 8px;
  color: ${C.text};
  font-family: inherit;
  font-size: 15px;
  padding: 11px 14px;
  outline: none;
  transition: border-color 0.15s;
  &:focus { border-color: ${C.accent}; }
`;

// ── Login ────────────────────────────────────────────────────────────────────

const LoginScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: ${C.bg};
`;

const LoginCard = styled.div`
  background: ${C.card};
  border: 1px solid ${C.border};
  border-radius: 16px;
  padding: 36px 32px;
  width: 100%;
  max-width: 380px;
  h1 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 4px;
    letter-spacing: -0.3px;
  }
  p {
    color: ${C.muted};
    font-size: 13px;
    margin-bottom: 28px;
  }
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: ${C.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const Input = styled.input`
  ${inputBase}
`;

const Btn = styled.button`
  display: block;
  width: 100%;
  background: ${C.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 12px;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 8px;
  &:hover { background: ${C.accentHover}; }
  &:disabled { opacity: 0.5; cursor: default; }
`;

const BtnSm = styled(Btn)`
  width: auto;
  padding: 9px 18px;
  font-size: 14px;
`;

const ErrorMsg = styled.div`
  color: ${C.danger};
  font-size: 13px;
  margin-top: 10px;
  min-height: 18px;
`;

// ── Dashboard ─────────────────────────────────────────────────────────────────

const DashWrapper = styled.div`
  background: ${C.bg};
  min-height: 100vh;
`;

const Header = styled.header`
  background: ${C.card};
  border-bottom: 1px solid ${C.border};
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  h1 {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.3px;
    margin: 0;
  }
  @media (min-width: 600px) { padding: 16px 24px; }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusDot = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $status }) =>
    $status === "connected"
      ? C.success
      : $status === "disconnected"
      ? C.danger
      : C.muted};
  box-shadow: ${({ $status }) =>
    $status === "connected" ? `0 0 6px ${C.success}` : "none"};
`;

const LogoutBtn = styled.button`
  background: none;
  border: 1px solid ${C.border};
  border-radius: 6px;
  color: ${C.muted};
  font-family: inherit;
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  &:hover { color: ${C.text}; border-color: ${C.muted}; }
`;

const Main = styled.main`
  padding: 20px 16px 40px;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 600px) { padding: 24px 24px 48px; }
`;

const Card = styled.div`
  background: ${C.card};
  border: 1px solid ${C.border};
  border-radius: 12px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 14px 16px 12px;
  border-bottom: 1px solid ${C.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${C.muted};
`;

const Badge = styled.span`
  background: ${C.accentDim};
  color: ${C.accent};
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
`;

const CardBody = styled.div`
  padding: 4px 0;
`;

const TaskItem = styled.div`
  padding: 11px 16px;
  border-bottom: 1px solid ${C.border};
  font-size: 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  &:last-child { border-bottom: none; }
`;

const TaskIcon = styled.span`
  flex-shrink: 0;
  margin-top: 1px;
  font-size: 13px;
`;

const TaskText = styled.span`
  flex: 1;
  word-break: break-word;
  ${({ $completed }) =>
    $completed
      ? `color: ${C.muted}; text-decoration: line-through; text-decoration-color: #444;`
      : ""}
`;

const EmptyState = styled.div`
  padding: 24px 16px;
  text-align: center;
  color: ${C.muted};
  font-size: 14px;
`;

const InstructionForm = styled.div`
  padding: 14px 16px;
`;

const StyledTextarea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 90px;
  margin-bottom: 10px;
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const LastSent = styled.div`
  font-size: 12px;
  color: ${C.muted};
  flex: 1;
  span { color: ${C.text}; }
`;

const InstrItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${C.border};
  font-size: 13px;
  &:last-child { border-bottom: none; }
`;

const InstrMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const InstrTime = styled.span`
  color: ${C.muted};
  font-size: 11px;
`;

const InstrStatus = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding: 1px 7px;
  border-radius: 10px;
  background: ${({ $read }) =>
    $read ? "rgba(34, 197, 94, 0.1)" : "rgba(234, 179, 8, 0.15)"};
  color: ${({ $read }) => ($read ? C.success : "#eab308")};
`;

const InstrText = styled.div`
  color: ${C.text};
  line-height: 1.4;
`;

const RefreshRow = styled.div`
  text-align: center;
  color: ${C.muted};
  font-size: 12px;
  padding: 4px 0 0;
`;

const Spinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid ${C.border};
  border-top-color: ${C.accent};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  vertical-align: middle;
  margin-right: 6px;
`;

const LoadingOverlay = styled.div`
  padding: 32px;
  text-align: center;
  color: ${C.muted};
  font-size: 14px;
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const TOKEN_KEY = "mc_token";

function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

// ── Page component ────────────────────────────────────────────────────────────

const MissionControlPage = () => {
  const [view, setView] = useState("init"); // "init" | "login" | "dashboard"
  const [token, setToken] = useState(null);

  // Login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard data
  const [status, setStatus] = useState("idle"); // "idle" | "connected" | "disconnected"
  const [activeTasks, setActiveTasks] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  // Instruction form
  const [instrText, setInstrText] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [lastSent, setLastSent] = useState(null); // { time, error }

  const refreshTimer = useRef(null);

  // ── Auth helpers ─────────────────────────────────────────────────────────

  const logout = useCallback(() => {
    if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    clearInterval(refreshTimer.current);
    setView("login");
  }, []);

  const loadStatus = useCallback(
    async (tok) => {
      try {
        const res = await fetch(`${API_URL}/api/status`, {
          headers: { Authorization: `Bearer ${tok}` },
        });
        if (res.status === 401) {
          logout();
          return;
        }
        const data = await res.json();
        setStatus("connected");
        setActiveTasks(data.tasks.active);
        setCompletedTasks(data.tasks.completed);
        setInstructions(data.instructions);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch {
        setStatus("disconnected");
        setLastUpdated("Connection error — retrying in 60s");
      }
    },
    [logout]
  );

  const startDashboard = useCallback(
    (tok) => {
      setView("dashboard");
      loadStatus(tok);
      clearInterval(refreshTimer.current);
      refreshTimer.current = setInterval(() => loadStatus(tok), 60000);
    },
    [loadStatus]
  );

  // ── Init: read stored token ───────────────────────────────────────────────

  useEffect(() => {
    const stored = getStoredToken();
    if (stored) {
      setToken(stored);
      startDashboard(stored);
    } else {
      setView("login");
    }
    return () => clearInterval(refreshTimer.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Login handler ─────────────────────────────────────────────────────────

  const handleLogin = async () => {
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      if (typeof window !== "undefined")
        localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      startDashboard(data.token);
    } catch (e) {
      setLoginError(e.message);
    } finally {
      setLoginLoading(false);
    }
  };

  // ── Send instruction ──────────────────────────────────────────────────────

  const handleSend = async () => {
    const text = instrText.trim();
    if (!text) return;
    setSendLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/instructions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setInstrText("");
      setLastSent({ time: data.timestamp, error: null });
      loadStatus(token);
    } catch (e) {
      setLastSent({ time: null, error: e.message });
    } finally {
      setSendLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (view === "init") {
    return (
      <>
        <GlobalStyle />
        <LoadingOverlay>
          <Spinner />
          Loading…
        </LoadingOverlay>
      </>
    );
  }

  if (view === "login") {
    return (
      <>
        <GlobalStyle />
        <LoginScreen>
          <LoginCard>
            <h1>Mission Control</h1>
            <p>Sandman AI dashboard</p>
            <Field>
              <Label htmlFor="mc-username">Username</Label>
              <Input
                id="mc-username"
                type="text"
                autoComplete="username"
                autoCapitalize="none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </Field>
            <Field>
              <Label htmlFor="mc-password">Password</Label>
              <Input
                id="mc-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </Field>
            <Btn onClick={handleLogin} disabled={loginLoading}>
              {loginLoading ? "Signing in…" : "Sign in"}
            </Btn>
            <ErrorMsg>{loginError}</ErrorMsg>
          </LoginCard>
        </LoginScreen>
      </>
    );
  }

  // dashboard view
  return (
    <>
      <GlobalStyle />
      <DashWrapper>
        <Header>
          <HeaderLeft>
            <StatusDot $status={status} />
            <h1>Mission Control</h1>
          </HeaderLeft>
          <LogoutBtn onClick={logout}>Log out</LogoutBtn>
        </Header>

        <Main>
          {/* Active Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
              <Badge>{activeTasks ? activeTasks.length : 0}</Badge>
            </CardHeader>
            <CardBody>
              {activeTasks === null ? (
                <LoadingOverlay>
                  <Spinner />
                  Loading…
                </LoadingOverlay>
              ) : activeTasks.length === 0 ? (
                <EmptyState>No active tasks</EmptyState>
              ) : (
                activeTasks.map((t, i) => (
                  <TaskItem key={i}>
                    <TaskIcon>▶</TaskIcon>
                    <TaskText>{t}</TaskText>
                  </TaskItem>
                ))
              )}
            </CardBody>
          </Card>

          {/* Completed Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <Badge>{completedTasks ? completedTasks.length : 0}</Badge>
            </CardHeader>
            <CardBody>
              {completedTasks === null ? (
                <LoadingOverlay>
                  <Spinner />
                  Loading…
                </LoadingOverlay>
              ) : completedTasks.length === 0 ? (
                <EmptyState>No completed tasks</EmptyState>
              ) : (
                completedTasks.map((t, i) => (
                  <TaskItem key={i}>
                    <TaskIcon>✓</TaskIcon>
                    <TaskText $completed>
                      {t}
                    </TaskText>
                  </TaskItem>
                ))
              )}
            </CardBody>
          </Card>

          {/* Send Instruction */}
          <Card>
            <CardHeader>
              <CardTitle>Send Instruction</CardTitle>
            </CardHeader>
            <InstructionForm>
              <StyledTextarea
                placeholder="Tell Sandman what to do…"
                value={instrText}
                onChange={(e) => setInstrText(e.target.value)}
              />
              <FormFooter>
                <LastSent>
                  {lastSent &&
                    (lastSent.error ? (
                      `Error: ${lastSent.error}`
                    ) : (
                      <>
                        Sent at <span>{fmtTime(lastSent.time)}</span>
                      </>
                    ))}
                </LastSent>
                <BtnSm onClick={handleSend} disabled={sendLoading}>
                  {sendLoading ? "Sending…" : "Send"}
                </BtnSm>
              </FormFooter>
            </InstructionForm>
          </Card>

          {/* Instruction History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Instructions</CardTitle>
              <Badge>{instructions ? instructions.length : 0}</Badge>
            </CardHeader>
            <CardBody>
              {instructions === null ? (
                <LoadingOverlay>
                  <Spinner />
                  Loading…
                </LoadingOverlay>
              ) : instructions.length === 0 ? (
                <EmptyState>No instructions sent yet</EmptyState>
              ) : (
                instructions.map((instr, i) => (
                  <InstrItem key={i}>
                    <InstrMeta>
                      <InstrTime>{fmtTime(instr.timestamp)}</InstrTime>
                      <InstrStatus $read={instr.read}>
                        {instr.read ? "read" : "pending"}
                      </InstrStatus>
                    </InstrMeta>
                    <InstrText>{instr.text}</InstrText>
                  </InstrItem>
                ))
              )}
            </CardBody>
          </Card>

          <RefreshRow>{lastUpdated && `Last updated ${lastUpdated}`}</RefreshRow>
        </Main>
      </DashWrapper>
    </>
  );
};

export default MissionControlPage;

export const Head = () => <title>Mission Control</title>;
