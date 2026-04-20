// Types mirror the Spring API schemas in openapi.yaml.
// Keep these in sync when the backend contract changes.

export interface UserResponse {
  id: number;
  email: string;
  createdAt: string;
}

export interface ChallengeResponse {
  id: number;
  ownerUserId: number;
  title: string;
  description?: string;
  category: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  createdAt: string;
  /** When true, challenge is not publicly visible (API JSON key: `private`). */
  "private"?: boolean;
  imageObjectKey?: string;
  imageUrl?: string;
  subtasks?: SubTaskResponse[];
}

export interface ChallengeRequest {
  ownerUserId: number;
  title: string;
  description?: string;
  category: string;
  startDate: string;
  endDate?: string;
  /** Default false when omitted. API JSON key: `private`. */
  "private"?: boolean;
}

export interface SubTaskResponse {
  id: number;
  challengeId: number;
  title: string;
  sortIndex: number;
}

export type ScheduleKind = "DAILY" | "WEEKLY_ON_SELECTED_DAYS";
export interface ScheduleResponse {
  id: number;
  challengeId?: number;
  subTaskId?: number;
  kind: ScheduleKind;
  weekDays?: string[];
}

export type InviteStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "CANCELLED";
export interface InviteResponse {
  id: number;
  inviterUserId: number;
  inviteeUserId: number;
  challengeId: number;
  subTaskId?: number;
  status: InviteStatus;
  createdAt: string;
  expiresAt?: string;
}

export interface CheckInResponse {
  id: number;
  userId: number;
  challengeId: number;
  checkDate: string;
  subTaskId?: number;
}

export interface CheckInRequest {
  userId: number;
  challengeId: number;
  checkDate: string; // YYYY-MM-DD
  subTaskId?: number;
}

export interface CommentResponse {
  id: number;
  userId: number;
  challengeId: number;
  subTaskId?: number;
  body: string;
  createdAt: string;
}

/** Spring Page wrapper for paginated collection endpoints. */
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (0-indexed)
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name?: string;
  email: string;
  password: string;
  password_confirmation: string;
}
