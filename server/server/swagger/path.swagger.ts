/**
*  @swagger
*  paths:
*  /user/register:
*    post:
*      summary: Register new user
*      tags:
*      - user
*      requestBody:
*        description: JSON object containing username and password
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/RegisterUserReq'
*      responses:
*        '201':
*          description: User successfully registered.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/RegisterUserRes'
*        '400':
*          description: Duplicated user entry.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*        '500':
*          description: Internal error during user registration
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*
*  /user/login:
*    post:
*      summary: User login
*      tags:
*      - user
*      requestBody:
*        description: JSON object containing username and password
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/RegisterUserReq'
*      responses:
*        '201':
*          description: User successfully logged in.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/LoginUserRes'
*        '400':
*          description: User not registered or invalid username/password combination.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*  
*  /user/logout:
*    post:
*      summary: User logout
*      tags:
*      - user
*      security:
*        - bearerAuth: []
*      responses:
*        '201':
*          description: User successfully logged out.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/LogoutUserRes'
*        '400':
*          description: Invalid user.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*        '401':
*          description: Unauthorized logout.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/UnauthorizedError'
*                
*                
*  /user/username:
*    patch:
*      summary: Change the username.
*      tags:
*      - user
*      security:
*        - bearerAuth: []
*      responses:
*        '201':
*          description: Username successfully updated.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/User'
*        '400':
*          description: Invalid user.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*        '401':
*          description: Unauthorized logout.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/UnauthorizedError'
*                
*  /user/verify:
*    post:
*      summary: Verify the provided JWT token.
*      tags:
*      - user
*      security:
*        - bearerAuth: []
*      responses:
*        '201':
*          description: Token verified OK.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/User'
*        '403':
*          description: Invalid authentification.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*  
*  /user/revoke:
*    post:
*      summary: Revoke the user account.
*      tags:
*      - user
*      security:
*        - bearerAuth: []
*      responses:
*        '201':
*          description: Account successfully revoked.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/User'
*        '500':
*          description: Internal server error during account revoking.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*        '401':
*          description: Unauthorized logout.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/UnauthorizedError'
*                
*  /device:
*    get:
*      summary: Get all devices for specific user.
*      tags:
*      - device
*      security:
*        - bearerAuth: []
*      responses:
*        '201':
*          description: Account successfully revoked.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/GetUserDevicesRes'
*        '500':
*          description: Internal server error during device fetching.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*        '401':
*          description: Unauthorized user.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/UnauthorizedError'
*                
*    post:
*      summary: Add new device for specific user.
*      tags:
*        - device
*      security:
*        - bearerAuth: []
*      responses:
*        '201':
*          description: Device successfully added.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Device'
*        '500':
*          description: Internal server error during device addition.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*        '401':
*          description: Unauthorized user.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/UnauthorizedError'
*                
*
*  /device/{name}:
*    get:
*      summary: Get device by its name.
*      tags:
*        - device
*      security:
*        - bearerAuth: []
*      parameters:
*        - in: path
*          name: name
*          required: true
*          schema:
*            type: string
*          description: Device name
*          example: camera001
*      responses:
*        '201':
*          description: Device found OK.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Device'
*        '500':
*          description: Internal server error during device fetching.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*        '401':
*          description: Unauthorized user.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/UnauthorizedError'
*    
*  /device/{id}:
*    put:
*      summary: Update device information.
*      tags:
*        - device
*      security:
*        - bearerAuth: []
*      parameters:
*        - in: path
*          name: id
*          required: true
*          schema:
*            type: string
*          description: Device ID.
*          example: 120310230s0ad1231
*      responses:
*        '201':
*          description: Device updated OK.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Device'
*        '500':
*          description: Internal server error during device update.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*        '401':
*          description: Unauthorized user.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/UnauthorizedError'
*    delete:
*      summary: Update device information.
*      tags:
*        - device
*      security:
*        - bearerAuth: []
*      parameters:
*        - in: path
*          name: id
*          required: true
*          schema:
*            type: string
*          description: Device ID.
*          example: 120310230s0ad1231
*      responses:
*        '201':
*          description: Device deleted OK.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Device'
*        '500':
*          description: Internal server error during device deletion.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Error'
*        '401':
*          description: Unauthorized user.
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/UnauthorizedError'
*/