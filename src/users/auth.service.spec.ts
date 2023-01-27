import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"

it("can create an instance of auth service class", () => {

    const module = Test.createTestingModule({
        providers: [AuthService],
    }).compile()
})