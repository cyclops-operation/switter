const formErrorMessage = {
  email: {
    invalid: "이메일 형식을 확인해주세요.",
    length: "이메일은 최소 2자리를 입력해주세요.",
  },
  password: {
    length: "비밀번호는 최소 2자리를 입력해주세요.",
  },
  guildName: {
    invalidName: "해당 길드명은 사용할 수 없습니다.",
    length: "길드명은 최소 1자리를 입력해주세요.",
  },
  nickname: {
    length: "닉네임은 최소 1자리를 입력해주세요.",
  },
  keyword: {
    minLength: "최소 3자리의 키워드를 입력해주세요.",
    maxLength: "키워드는 최대 3자리만 허용합니다.",
  },
  deckMonsterList: {
    length: "총 3마리의 몬스터를 선택해주세요.",
    duplicated: "중복 몬스터는 허용하지 않습니다.",
  },
  requestRow: {
    title: {
      length: "제목은 최소 1자리를 입력해주세요.",
    },
    description: {
      length: "설명은 최소 1자리를 입력해주세요.",
    },
  },
} as const

const apiErrorMessage = {
  BadRequest: "잘못된 요청입니다.",
  Conflict: "중복된 요청입니다.",
  UnAuthorized: "권한이 없습니다.",
  NotFound: "리소스를 찾을 수 없습니다.",
  ServerError: "서버요청에 에러가 발생했습니다.",
}

const apiErrorCode = {
  BadRequest: 400,
  UnAuthorized: 401,
  NotFound: 404,
  ServerError: 500,
  Conflict: 409,
} as const

export { apiErrorCode, apiErrorMessage, formErrorMessage }
