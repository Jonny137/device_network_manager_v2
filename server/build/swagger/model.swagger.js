"use strict";
/**
*  @swagger
*  components:
*  securitySchemes:
*    bearerAuth:            # arbitrary name for the security scheme
*      type: http
*      scheme: bearer
*      bearerFormat: JWT
*
*  schemas:
*    Error:
*      type: object
*      description: Error object that will be returned by the API on exceptional situations.
*      properties:
*        httpCode:
*          type: integer
*          description: HTTP status code of this error, i.e. 400, 409, 502..
*          example: 404
*        message:
*           type: string
*           description: Human readable text message describing the error.
*           example: Requested location doesn't exists.
*
*    UnauthorizedError:
*      type: object
*      description: Access token is missing or invalid
*      properties:
*        httpCode:
*          type: integer
*          example: 401
*        message:
*           type: string
*           example: Unauthorized.
*
*    User:
*      type: object
*      properties:
*        id:
*          type: string
*          description: The user ID.
*          example: 0
*        username:
*          type: string
*          description: Call sign of the user.
*          example: John Smith
*        password:
*          type: string
*          description: Users password.
*          example: $2b$12$gXe7D2TKd4VtTWfZR4Ss0edbbXe06h/BtTNhlr1UJ548z6HN.bxfe
*        createdAt:
*          type: string
*          description: Date of document creation.
*          example: '2021-11-11T11:29:36.659+00:00'
*        modifiedAt:
*          type: string
*          description: Date of documents last modification.
*          example: '2021-11-11T11:29:36.659+00:00'
*      required:
*         - username
*         - password
*
*    Device:
*      type: object
*      properties:
*        id:
*          type: string
*          description: The device ID.
*          example: 0
*        name:
*          type: string
*          description: Device name.
*          example: Camera003
*        type:
*          type: string
*          description: Device type.
*        host:
*          type: string
*          description: Hostname of device server.
*        status:
*          type: string
*          description: Network status of the device.
*          default: Disconnected
*        disc_time:
*          type: integer
*          description: Time period of device status being disconnected since last connected state.
*          default: 0
*        createdAt:
*          type: string
*          description: Date of document creation.
*        modifiedAt:
*          type: string
*          description: Date of documents last modification.
*        user:
*          oneOf:
*          - $ref: '#/components/schemas/User'
*          description: User to whom the device belongs to.
*      required:
*        - host
*
*
*    GetUserDevicesRes:
*      type: object
*      properties:
*        devices:
*          description: Array of device objects.
*          type: array
*          items:
*            $ref: "#/components/schemas/Device"
*
*    RegisterUserReq:
*      type: object
*      properties:
*        username:
*          type: string
*          example: johnny137
*        password:
*          type: string
*          example: hackmeshepard
*      required:
*        - username
*        - password
*
*    RegisterUserRes:
*      type: object
*      description: Request body format when registering a new user.
*      properties:
*        id:
*          type: string
*          description: The user ID.
*          example: 01230as0da012301sd1231
*        username:
*          type: string
*          example: johnny137
*        password:
*          type: string
*          description: Hashed password.
*          example: $2b$12$gXe7D2TKd4VtTWfZR4Ss0edbbXe06h/BtTNhlr1UJ548z6HN.bxfe
*        createdAt:
*          type: string
*          description: Date of document creation.
*          example: '2022-01-20T10:42:19.766Z'
*        modifiedAt:
*          type: string
*          description: Date of documents last modification.
*          example: '2022-01-20T10:42:19.766Z'
*
*    LoginUserRes:
*      description: Response data format after user login successful attempt.
*      type: object
*      properties:
*        message:
*          type: string
*          example: $2b$12$gXe7D2TKd4VtTWfZR4Ss0edbbXe06h/BtTNhlr1UJ548z6HN.bxfe
*        status:
*          type: string
*          example: OK
*
*    LogoutUserRes:
*      description: Response data format after user logout successful attempt.
*      type: object
*      properties:
*        message:
*          type: string
*          example: 'Successfully logged out.'
*        status:
*          type: string
*          example: OK
*/ 
