import fastapi
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import pymysql
from datetime import date

def json_default(value):
    if isinstance(value, date):
        return value.isoformat()
    raise TypeError(f'Object of type {value.__class__.__name__} is not JSON serializable')


app = FastAPI()
class DataBase(object):
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(DataBase, cls).__new__(cls)
        return cls.instance
    def __init__(self):
        self.connection = None
        self.cursor = None
        self.__connect()
    def __connect(self):
        self.connection = pymysql.connect(  
        host='localhost',  
        port=3306,           
        user='root', 
        password='Aika1711',
        database='lab4',  
        )
        self.cursor = self.connection.cursor(pymysql.cursors.DictCursor)
    def execute(self, query, values=None):
        if values:
            self.cursor.execute(query, values)
        else:
            self.cursor.execute(query)

        result = self.cursor.fetchall()
        self.connection.commit()
        return result
    
    
    @app.get('/')
    async def root():
        return {'message': "Hello! I`m not working"}
    
    @app.get("/api/allusers")
    async def get_users():
        db = DataBase() 
        return JSONResponse(db.execute('SELECT * FROM user'))
    
    
    @app.get("/api/showfile")
    async def showfile():
        try:
            with DataBase() as db:
                result = db.execute('SELECT * FROM file')
                # Преобразование результата в JSON с использованием функции json_default
                json_result = json.dumps(result, default=json_default)
                return JSONResponse(content=json_result)
        except Exception as e:
            # Обработка ошибок, например, логирование
            return JSONResponse(content={"error": str(e)}, status_code=500)
    
    
    @app.get('/api/user/{id}')
    def get_user_by_id(id):
        db = DataBase()  
        result = db.execute(f'SELECT * FROM user WHERE id={id}') 
        if not result: 
            raise fastapi.HTTPException(status_code=404)
        return JSONResponse(result)
    
    # @app.post('/api/adduser', status_code=201)
    # async def add_new_user(req: Request):  
    #     req_dict = await req.json() 
    #     try:
    #         id = req_dict['id']
    #         username = req_dict['username']
    #         email = req_dict['email'] 
    #         password = req_dict['password'] 
    #     except:     
    #         raise fastapi.HTTPException(status_code=400)
    #     db = DataBase()
    #     db.execute("INSERT INTO `user`(`idUSER`, `user_username`, `user_email`, `user_password`) VALUES (%s, %s, %s, %s);", (id, username, email, password))
        
    
    @app.post('/api/addfile', status_code=201 )
    async def addfile(req: Request):
        req_dict = await req.json()
        try:
            id = req_dict['id']
            filename = req_dict['filename']
            filedescript = req_dict['filedescript']
            fileupload = req_dict['fileupload']
        except:
            raise fastapi.HTTPException(status_code=400)            
        db= DataBase()
        query = "INSERT INTO `file`(`idFILE`, `file_name`, `file_description`, `file_upload`) VALUES (%s, %s, %s, %s);"
        values = (id, filename, filedescript, fileupload)
        db.execute(query, values)
    
    @app.put('/api/updateuser/{id}')
    async def update_user(id, req: Request):
        req_dict = await req.json() 
        db = DataBase()
        for key in req_dict:  
            if not db.execute(f'SELECT * FROM user WHERE id={id}'):
                raise fastapi.HTTPException(status_code=404)
            db.execute(f'UPDATE user SET {key}=%s WHERE id=%s', (req_dict[key], id))
        return {"message":'Updated!'}
    
    
    @app.delete('/api/deleteuser/{id}')
    def delete(id):
        db = DataBase()
        if not db.execute(f'SELECT * FROM user WHERE id={id}'):
            raise fastapi.HTTPException(status_code=404)
        db.execute(f'DELETE FROM `user` WHERE id={id}')
        return {'message':f'User with id={id} deleted'}