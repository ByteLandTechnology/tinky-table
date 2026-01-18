/**
 * @fileoverview Interactive "Process Manager" demo for tinky-table.
 *
 * Simulates a top/htop-like interface to showcase:
 * - High-frequency updates (simulated)
 * - Sortable columns
 * - Row selection & keyboard navigation
 * - Modal details view
 * - Filtering/Search
 */

import { render, Box, Text, useInput, useApp } from "tinky";
import React, { useState, useMemo, useEffect } from "react";
import { Table } from "../src/index.js";
import type { ColumnDef, SortDirection } from "../src/index.js";

// --- Types ---

interface Process {
  readonly [key: string]: unknown;
  id: number;
  pid: number;
  user: string;
  priority: number;
  cpu: number;
  mem: number;
  time: string;
  command: string;
  status: "running" | "sleeping" | "stopped" | "zombie";
}

type SortKey = keyof Process & string;

// --- Data Generation ---

const USERS = ["root", "yuyang", "system", "daemon", "mysql", "www-data"];
const COMMANDS = [
  "node server.js",
  "python train_model.py",
  "postgres: writer",
  "chrome --type=renderer",
  "slack",
  "code .",
  "bun run dev",
  "docker-containerd",
  "kworker/u16:0",
  "systemd-journald",
  "top",
  "vim /etc/hosts",
  "grep -r 'TODO' .",
  "cargo build",
  "npm install",
];

function generateProcess(id: number): Process {
  return {
    id,
    pid: Math.floor(Math.random() * 32000) + 100,
    user: USERS[Math.floor(Math.random() * USERS.length)],
    priority: Math.floor(Math.random() * 40) - 20,
    cpu: Number((Math.random() * 100).toFixed(1)),
    mem: Number((Math.random() * 15).toFixed(1)),
    time: `${Math.floor(Math.random() * 100)}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}.${Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0")}`,
    command: COMMANDS[Math.floor(Math.random() * COMMANDS.length)],
    status:
      Math.random() > 0.8
        ? "sleeping"
        : Math.random() > 0.9
          ? "stopped"
          : "running",
  };
}

const INITIAL_DATA_SIZE = 50;
const INITIAL_DATA: Process[] = Array.from(
  { length: INITIAL_DATA_SIZE },
  (_, i) => generateProcess(i + 1),
);

// --- Components ---

function ProgressBar({
  value,
  color = "green",
}: {
  value: number;
  color?: string;
}) {
  const width = 10;
  const filled = Math.round((value / 100) * width);
  const empty = width - filled;
  return (
    <Text color={color}>
      {"█".repeat(filled)}
      <Text dimColor>{"░".repeat(empty)}</Text>
    </Text>
  );
}

function StatusBadge({ status }: { status: Process["status"] }) {
  switch (status) {
    case "running":
      return (
        <Text color="green" bold>
          RUN
        </Text>
      );
    case "sleeping":
      return <Text color="blue">SLP</Text>;
    case "stopped":
      return <Text color="yellow">STP</Text>;
    case "zombie":
      return (
        <Text color="red" bold>
          ZOM
        </Text>
      );
  }
}

function Modal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <Box
      borderStyle="round"
      borderColor="yellow"
      flexDirection="column"
      padding={1}
      position="absolute"
      width={60}
      height={15}
      // Center roughly
      marginLeft={5}
      marginTop={2}
      backgroundColor="black"
    >
      <Box justifyContent="center" marginBottom={1}>
        <Text bold color="yellow" underline>
          {title}
        </Text>
      </Box>
      <Box flexDirection="column" flexGrow={1}>
        {children}
      </Box>
      <Box marginTop={1} justifyContent="center">
        <Text dimColor>Press [Esc] or [Enter] to close</Text>
      </Box>
    </Box>
  );
}

function Demo() {
  const { exit } = useApp();
  const [data, setData] = useState<Process[]>(INITIAL_DATA);
  const [sortState, setSortState] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({ key: "cpu", direction: "desc" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const pageSize = 15;

  // Simulate dynamic updates
  useEffect(() => {
    const timer = setInterval(() => {
      if (showModal || isSearchMode) return; // Pause updates when interacting

      setData((prevData) =>
        prevData.map((p) => {
          if (Math.random() > 0.7) {
            return {
              ...p,
              cpu: Math.max(0, Math.min(100, p.cpu + (Math.random() * 10 - 5))),
              mem: Math.max(0, Math.min(100, p.mem + (Math.random() * 2 - 1))),
            };
          }
          return p;
        }),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [showModal, isSearchMode]);

  // Filter and Sort
  const filteredData = useMemo(() => {
    let result = data;
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.command.toLowerCase().includes(lowerQuery) ||
          p.user.toLowerCase().includes(lowerQuery) ||
          String(p.pid).includes(lowerQuery),
      );
    }
    return result.sort((a, b) => {
      const aVal = a[sortState.key] as number | string;
      const bVal = b[sortState.key] as number | string;
      if (aVal === bVal) return 0;
      const comparison = aVal > bVal ? 1 : -1;
      return sortState.direction === "asc" ? comparison : -comparison;
    });
  }, [data, searchQuery, sortState]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // Keep selection in bounds
  useEffect(() => {
    if (selectedIndex >= paginatedData.length) {
      setSelectedIndex(Math.max(0, paginatedData.length - 1));
    }
  }, [paginatedData.length, selectedIndex]);

  // Input Handling
  useInput((input, key) => {
    if (showModal) {
      if (key.escape || key.return) {
        setShowModal(false);
      }
      return;
    }

    if (isSearchMode) {
      if (key.escape || key.return) {
        setIsSearchMode(false);
      } else if (key.backspace || key.delete) {
        setSearchQuery((prev) => prev.slice(0, -1));
      } else if (input.length === 1) {
        setSearchQuery((prev) => prev + input);
      }
      return;
    }

    if (input === "q") {
      exit();
      return;
    }

    if (input === "/") {
      setIsSearchMode(true);
      return;
    }

    // Navigation
    if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(prev + 1, paginatedData.length - 1));
    }
    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
    if (key.leftArrow && page > 1) {
      setPage((prev) => prev - 1);
      setSelectedIndex(0);
    }
    if (key.rightArrow && page < totalPages) {
      setPage((prev) => prev + 1);
      setSelectedIndex(0);
    }
    if (key.return) {
      setShowModal(true);
    }

    // Sorting shortcuts
    if (input === "c") setSortState({ key: "cpu", direction: "desc" });
    if (input === "m") setSortState({ key: "mem", direction: "desc" });
    if (input === "p") setSortState({ key: "pid", direction: "asc" });
  });

  const columns: ColumnDef<Process>[] = useMemo(
    () => [
      { key: "pid", title: "PID", width: 8, align: "right" },
      { key: "user", title: "USER", width: 10 },
      { key: "priority", title: "PRI", width: 6, align: "right" },
      {
        key: "cpu",
        title: "CPU%",
        width: 15,
        render: (val) => <ProgressBar value={val as number} color="green" />,
      },
      {
        key: "mem",
        title: "MEM%",
        width: 15,
        render: (val) => <ProgressBar value={val as number} color="cyan" />,
      },
      {
        key: "status",
        title: "S",
        width: 5,
        render: (val) => <StatusBadge status={val as Process["status"]} />,
      },
      { key: "time", title: "TIME+", width: 10, align: "right" },
      { key: "command", title: "COMMAND", width: "auto" },
    ],
    [],
  );

  const selectedProcess = paginatedData[selectedIndex];

  return (
    <Box flexDirection="column" padding={1} height="100%">
      {/* Header */}
      <Box gap={2} marginBottom={1}>
        <Text bold inverse>
          {" TINKY PROCESS MANAGER "}
        </Text>
        <Text>
          Tasks:{" "}
          <Text color="green" bold>
            {data.length}
          </Text>{" "}
          total
        </Text>
        <Text>
          Load avg: <Text color="red">1.45 1.10 0.98</Text>
        </Text>
        <Text>
          Uptime: <Text color="blue">14 days</Text>
        </Text>
      </Box>

      {/* Search Bar (if active) */}
      <Box height={1} marginBottom={1}>
        {isSearchMode ? (
          <Text>
            Filter: <Text color="yellow">{searchQuery}█</Text>
          </Text>
        ) : searchQuery ? (
          <Text dimColor>Filter: {searchQuery}</Text>
        ) : null}
      </Box>

      {/* Main Table */}
      <Table<Process>
        data={paginatedData}
        columns={columns}
        borderStyle="single"
        sortState={sortState}
        width="100%"
        rowStyle={(_, index) => {
          const isSelected = index === selectedIndex;
          if (isSelected) {
            return { backgroundColor: "cyan", color: "black" };
          }
          return {};
        }}
      />

      {/* Pagination & Hint */}
      <Box marginTop={1} justifyContent="space-between">
        <Text dimColor>
          Page {page}/{totalPages} (Arrow keys to navigate)
        </Text>
        <Text>[q] Quit | [c] CPU | [m] Mem | [/] Filter | [Enter] Select</Text>
      </Box>

      {/* Modal Overlay */}
      {showModal && selectedProcess && (
        <Modal
          title={`Process Details: ${selectedProcess.command}`}
          onClose={() => setShowModal(false)}
        >
          <Box flexDirection="column" gap={1}>
            <Text>PID: {selectedProcess.pid}</Text>
            <Text>User: {selectedProcess.user}</Text>
            <Text>Status: {selectedProcess.status.toUpperCase()}</Text>
            <Box flexDirection="column" borderStyle="single" padding={1}>
              <Text>Resources:</Text>
              <Text>CPU: {formatPercent(selectedProcess.cpu)}</Text>
              <Text>MEM: {formatPercent(selectedProcess.mem)}</Text>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

function formatPercent(n: number) {
  return `${n.toFixed(1)}%`;
}

render(<Demo />);
