// type
import { User } from "@prisma/client"
import { DefaultUser as DefaultAuthUser } from "next-auth"

export type SessionUser = Omit<DefaultAuthUser, "id" | "image"> & User

// 여기서 재정의한 타입이 "session.user"의 타입으로 정의됨
declare module "next-auth" {
  interface Session {
    user: SessionUser
  }
}
