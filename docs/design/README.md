# Проєктування бази даних

В рамках проекту розробляється: 
- модель бізнес-об'єктів 
- ER-модель
- @startuml  
entity User <<ENTITY>>{ 
User.id:NUMBER 
User.username:TEXT 
User.email:TEXT 
User.password:TEXT 
User.firstname:TEXT 
User.lastname:TEXT 
} 
 
entity Stafflogin <<ENTITY>>{ 
Stafflogin.id:NUMBER 
} 
 
entity Role <<ENTITY>>{ 
Role.name:TEXT 
Role.id:NUMBER 
} 
 
entity Access <<ENTITY>>{ 
Access.id:NUMBER 
} 
 
entity Datafile <<ENTITY>> { 
Datafile.id:NUMBER 
Datafile.name:TEXT 
Datafile.content:TEXT 
Datafile.description:TEXT 
Datafile.format:TEXT 
Datafile.date:NUMBER 
} 
 
entity Link <<ENTITY>>{ 
} 
   
entity Tag <<ENTITY>>{ 
Tag.name:TEXT 
} 
 
User"0,*" -- "1,1"Stafflogin 
Role"0,*" -- "1,1"Stafflogin 
User"1,1" -- "0,*"Access 
Access"0,*" -- "1,1"Datafile 
Datafile"1,1" -- "0,*"Link 
Link"0,*" -- "1,1"Tag 
@enduml

- реляційна схема

