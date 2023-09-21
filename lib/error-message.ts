const formErrorMessage = {
  id: {
    length: "아이디는 최소 2자리를 입력해주세요.",
  },
  guildName: {
    length: "길드명은 최소 1자리를 입력해주세요.",
  },
  name: {
    length: "닉네임은 최소 1자리를 입력해주세요.",
  },
} as const

export { formErrorMessage }
