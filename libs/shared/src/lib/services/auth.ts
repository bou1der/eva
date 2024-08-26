
class AuthService {
  public readonly host: "kafka:9093"
  public readonly clientId: "auth.service"
  public readonly groupId: "auth.group"
}

export const AuthMicroservice = new AuthService()

