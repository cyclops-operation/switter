const formErrorMessage = {
  id: {
    length: "아이디는 최소 2자리를 입력해주세요.",
  },
  guildName: {
    length: "길드명은 최소 1자리를 입력해주세요.",
  },
  nickname: {
    length: "닉네임은 최소 1자리를 입력해주세요.",
  },
  monsterList: {
    length: "총 3마리의 몬스터를 선택해주세요.",
    duplicated: "중복 몬스터는 허용하지 않습니다.",
  },
} as const

const apiErrorMessage = {
  BadRequest: "잘못된 요청입니다.",
  UnAuthorized: "권한이 없습니다.",
  NotFound: "리소스를 찾을 수 없습니다.",
  ServerError: "서버요청에 에러가 발생했습니다.",
} as const

export { apiErrorMessage, formErrorMessage }
