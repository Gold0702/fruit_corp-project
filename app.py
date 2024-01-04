import sqlalchemy.exc
from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Numeric
from dataclasses import dataclass
from sqlalchemy.orm import validates
import re
from flask_cors import CORS
app = Flask(__name__)
HOST="127.0.0.1"
PORT = 3306
USERNAME="root"
PASSWORD="zxc7898745"
DATABASE="fruit_corp"
app.config['SQLALCHEMY_DATABASE_URI']=f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}?charset=utf8'
db = SQLAlchemy(app)
CORS(app)
@dataclass
class fruit(db.Model):
    __tablename__ = 'fruit'
    fruit_id:str = db.Column(db.String(13), primary_key=True)
    fruit_name:str=db.Column(db.String(12),nullable=False)
    vendor_name:str=db.Column(db.String(12),nullable=False)
    current_number:int=db.Column(db.Integer,nullable=False)
    unit:str=db.Column(db.String(4),nullable=False)
    unitPrice:Numeric=db.Column(Numeric(precision=8,scale=2),nullable=False)
    current_price:Numeric=db.Column(Numeric(precision=8,scale=2),nullable=False,onupdate=db.text('current_number * unitPrice'))
    position:str=db.Column(db.String(12),nullable=False)
    ArrivalDate: db.Date=db.Column(db.Date,nullable=False)
    promotionDate: db.Date=db.Column(db.Date,nullable=False)
    discardDate: db.Date=db.Column(db.Date,nullable=False)
    status: str = db.Column(db.String(5), nullable=False)
    @validates('fruit_id')
    def validate_fruit_id(self,key,value):
        if not re.match(r'^[0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{2}$',value):
            return ValueError('Invalid Fruit ID')
        return value
    @validates('current_number')
    def validate_current_number(self,key,value):
        if not value<1000000:
            return ValueError('Invalid current number')
        return value
@dataclass
class vendor(db.Model):
    __tablename__='vendor'
    vendor_id:str=db.Column(db.String(8),primary_key=True)
    vendor_name:str=db.Column(db.String(12),nullable=False)
    telephone:str=db.Column(db.String(16),nullable=False)
    email:str=db.Column(db.String(36),nullable=False)
    address:str=db.Column(db.String(60),nullable=False)
    host:str=db.Column(db.String(12),nullable=False)
    status:str=db.Column(db.String(5),nullable=False)
    @validates('vendor_id')
    def validate_vendor_id(self,key,value):
        if not re.match(r'^[0-9]+$',value):
            return ValueError('Invalid vendor_id')
        return value
    @validates('telephone')
    def validate_telephone(self,key,value):
        if not re.match(r'^[0-9]+$',value):
            return ValueError('Invalid telephone')
        return value
@dataclass
class formerMember(db.Model):
    __tablename__='formerMember'
    member_id:str=db.Column(db.String(10),primary_key=True)
    member_name:str=db.Column(db.String(12),nullable=False)
    telephone:str=db.Column(db.String(16),nullable=False)
    cellphone:str=db.Column(db.String(16),nullable=False)
    email:str=db.Column(db.String(36),nullable=False)
    haveLine:str=db.Column(db.String(1),nullable=False)
    address:str=db.Column(db.String(60),nullable=False)
    age:int=db.Column(db.Integer,nullable=False)
    member_discount:float=db.Column(db.Float,nullable=False)
    status: str = db.Column(db.String(5), nullable=False)
    @validates('member_id')
    def validate_member_id(self,key,value):
        if not re.match(r'^[A-Z]{1}[0-9]{9}$',value):
            return ValueError('Invalid Member ID')
        return value
    @validates('telephone')
    def validate_telephone(self,key,value):
        if not re.match(r'^[0-9]+$',value):
            return ValueError('Invalid telephone')
        return value
    @validates('cellphone')
    def validate_cellphone(self,key,value):
        if not re.match(r'^[0-9]+$',value):
            return ValueError('Invalid cellphone')
        return value
    @validates('haveLine')
    def validate_haveLine(self,key,value):
        if not (value=="是"or value=='否'):
            return ValueError('Invalid Have Line format')
        return value
@dataclass
class member(db.Model):
    __tablename__='member'
    member_id:str=db.Column(db.String(10),primary_key=True)
    member_name:str=db.Column(db.String(12),nullable=False)
    telephone:str=db.Column(db.String(16),nullable=False)
    cellphone:str=db.Column(db.String(16),nullable=False)
    email:str=db.Column(db.String(36),nullable=False)
    haveLine:str=db.Column(db.String(1),nullable=False)
    address:str=db.Column(db.String(60),nullable=False)
    age:int=db.Column(db.Integer,nullable=False)
    member_discount:Numeric=db.Column(Numeric(precision=3,scale=2),nullable=False)
    status:str=db.Column(db.String(5),nullable=False)
    @validates('member_id')
    def validate_member_id(self,key,value):
        if not re.match(r'^[A-Z]{1}[0-9]{9}$',value):
            return ValueError('Invalid Member ID')
        return value
    @validates('telephone')
    def validate_telephone(self,key,value):
        if not re.match(r'^[0-9]+$',value):
            return ValueError('Invalid telephone')
        return value
    @validates('cellphone')
    def validate_cellphone(self,key,value):
        if not re.match(r'^[0-9]+$',value):
            return ValueError('Invalid cellphone')
        return value
    @validates('haveLine')
    def validate_haveLine(self,key,value):
        if not (value=="是"or value=='否'):
            return ValueError('Invalid Have Line format')
        return value
@dataclass
class trade(db.Model):
    __tablename__='trade'
    trade_id:int=db.Column(db.Integer,primary_key=True,autoincrement=True)
    fruit_id:str = db.Column(db.String(13))
    member_id:str =db.Column(db.String(10))
    fruit_name: str = db.Column(db.String(12), nullable=False) #
    vendor_name: str = db.Column(db.String(12), nullable=False) #
    quantity: int = db.Column(db.Integer,nullable=False)
    unitPrice: float=db.Column(db.Float,nullable=False)
    totalPrice: float=db.Column(db.Float,nullable=False,onupdate=db.text('quantity * unitPrice'))
    PriceWithDiscount: float=db.Column(db. Float,nullable=False) #
    TradeDate: db.Date=db.Column(db.Date,nullable=False)
    predictedDate: db.Date=db.Column(db.Date,nullable=False)
    actualDate: db.Date=db.Column(db.Date,nullable=False)
    status:str=db.Column(db.String(5),nullable=False) #
    @validates('fruit_name')
    def validate_fruit_name(self,key,value):
        Fruit=fruit.query.get(self.fruit_id)
        if not Fruit.fruit_name==value:
            return ValueError("fruit_name is wrong!")
        return value
    @validates('quantity')
    def validate_quantity(self,key,value):
        if value >=1000000 and value>0:
            return ValueError("quantity is wrong !")
        return value
@app.route('/fruit/add',methods=['POST'])
def add_fruit():
    data = request.get_json()["body"]
    try:
        Fruit=fruit(fruit_id=data['fruit_id'],
                    fruit_name=data['fruit_name'],
                    vendor_name=data['vendor_name'],
                    current_number=data['current_number'],
                    unit=data['unit'],
                    unitPrice=data['unit_price'],
                    current_price=data['current_price'],
                    position=data['position'],
                    ArrivalDate=data['arrival_date'],
                    promotionDate=data['promotion_date'],
                    discardDate=data['discard_date'],
                    status="正常")
        db.session.add(Fruit)
        db.session.commit()
    except sqlalchemy.exc.DataError:
        return "欄位輸入錯誤"
    except sqlalchemy.exc.IntegrityError:
        return "水果編號已重複"
    else:
        return "成功添加資料"
@app.route('/fruit/delete',methods=['POST'])
def delete_fruit():
    Request=request.get_json()['body']
    fruit_id=Request['fruit_id']
    data=fruit.query.get(fruit_id)
    data.status="已刪除"
    db.session.commit()
    return jsonify({"ok":"1"})
@app.route('/fruit/update', methods=['POST'])
def update_fruit():

    return
@app.route('/fruit/query', methods=['GET'])
def fruit_querypost():
    Fruit=fruit.query.all()
    return jsonify(Fruit)
@app.route('/fruit/query', methods=['POST'])
def fruit_queryget():
    Request=request.get_json()['body']
    fruit_name=Request['fruit_name']
    fruit_id=Request['fruit_id']
    data={}
    if(fruit_name=="" and fruit_id==""):
        data=fruit.query.all()
    elif(fruit_name==""):
        data=fruit.query.get(fruit_id)
        if(data==None):
            data={}
    elif(fruit_id==""):
        data=db.session.query(fruit).filter_by(fruit_name=fruit_name).all()
    return jsonify(data)
@app.route('/vendor/add',methods=['POST'])
def vendor_add():
    Request=request.get_json()['body']
    try:
        Vendor = vendor(vendor_id=Request['vendor_id'],
                        vendor_name=Request['vendor_name'],
                        telephone=Request['telephone'],
                        email=Request['email'],
                        address=Request['address'],
                        host=Request['host'],
                        status="正常")
        db.session.add(Vendor)
        db.session.commit()
    except sqlalchemy.exc.DataError:
        return "資料欄位錯誤"
    except sqlalchemy.exc.IntegrityError:
        return "供應商統一編號已重複"
    else:
        return "已成功添加"
@app.route('/vendor/delete',methods=['POST'])
def vendor_delete():
    Request=request.get_json()['body']
    vendor_id=Request['vendor_id']
    Vendor=vendor.query.get(vendor_id)
    Vendor.status="已刪除"
    db.session.commit()
    return jsonify({"ok":"1"})
# @app.route('/vendor/update', methods=['POST'])
@app.route('/vendor/query', methods=['GET'])
def vendor_queryget():
    data=vendor.query.all()
    return jsonify(data)
@app.route('/vendor/query', methods=['POST'])
def vendor_querypost():
    Request=request.get_json()['body']
    vendor_id=Request['vendor_id']
    vendor_name=Request['vendor_name']
    data={}
    if(vendor_id=="" and vendor_name==""):
        data=vendor.query.all()
    else:
        if(vendor_id==""):
            data=vendor.query.filter_by(vendor_name=vendor_name).all()
        elif(vendor_name==""):
            data=vendor.query.get(vendor_id)
            if(data==None):
                data={}
    return jsonify(data)
@app.route('/member/add',methods=['POST'])
def member_add():
    Request=request.get_json()['body']
    try:
        Member=member(member_id=Request['member_id'],
                      member_name=Request['member_name'],
                      telephone=Request['telephone'],
                      cellphone=Request['cellphone'],
                      email=Request['email'],
                      haveLine=Request['haveLine'],
                      address=Request['address'],
                      age=Request['age'],
                      member_discount=Request['member_discount'],
                      status="正常"
                      )
        db.session.add(Member)
        db.session.commit()
    except sqlalchemy.exc.DataError:
        return "資料欄位錯誤"
    except sqlalchemy.exc.IntegrityError:
        return "會員編號已重複"
    else:
        return jsonify("成功添加資料")
@app.route('/member/delete',methods=['POST'])
def member_delete():
    Request=request.get_json()['body']
    member_id=Request['member_id']
    Member=member.query.get(member_id)
    FormerMember=formerMember(member_id=Member.member_id,
                      member_name=Member.member_name,
                      telephone=Member.telephone,
                      cellphone=Member.cellphone,
                      email=Member.email,
                      haveLine=Member.haveLine,
                      address=Member.address,
                      age=Member.age,
                      member_discount=Member.member_discount,
                      status="已停止"
                      )
    db.session.delete(Member)
    db.session.add(FormerMember)
    db.session.commit()
    return {"ok":'1'}
# @app.route('/member/update', methods=['POST'])
@app.route('/member/query', methods=['GET'])
def member_queryget():
    data=member.query.all()
    return jsonify(data)
@app.route('/member/query', methods=['POST'])
def member_querypost():
    Request=request.get_json()['body']
    member_id=Request['member_id']
    member_name=Request['member_name']
    data={}
    if(member_id==""and member_name==""):
        data=member.query.all()
    else:
        if (member_id == ""):
            data = db.session.query(member).filter_by(member_name=member_name).all()
        elif (member_name == ""):
            data = member.query.get(member_id)
            if data == None:
                data = {}
    return jsonify(data)

@app.route('/former_member/delete',methods=['POST'])
def former_member_delete():
    Request=request.get_json()['body']
    member_id=Request['member_id']
    FormerMember=formerMember.query.get(member_id)
    Member=member(member_id=FormerMember.member_id,
                      member_name=FormerMember.member_name,
                      telephone=FormerMember.telephone,
                      cellphone=FormerMember.cellphone,
                      email=FormerMember.email,
                      haveLine=FormerMember.haveLine,
                      address=FormerMember.address,
                      age=FormerMember.age,
                      member_discount=FormerMember.member_discount,
                      status="正常"
                      )
    db.session.add(Member)
    db.session.delete(FormerMember)
    db.session.commit()
    return jsonify(Member)
@app.route('/former_member/query', methods=['POST'])
def former_member_querypost():
    Request=request.get_json()['body']
    member_id=Request['member_id']
    member_name=Request['member_name']
    data={}
    if(member_id==""and member_name==""):
        data=formerMember.query.all()
    else:
        if (member_id == ""):
            data = db.session.query(formerMember).filter_by(member_name=member_name).all()
        elif (member_name == ""):
            data = formerMember.query.get(member_id)
            if data == None:
                data = {}
    return jsonify(data)
@app.route('/former_member/query', methods=['GET'])
def former_member_query():
    data=formerMember.query.all()
    return jsonify(data)

@app.route('/trade/add',methods=['POST'])
def trade_add():
    Request=request.get_json()['body']
    fruit_id=Request['fruit_id']
    member_id=Request['member_id']
    Fruit=fruit.query.get(fruit_id)
    Member=member.query.get(member_id)
    flag=False
    try:
        Trade=trade(fruit_id=fruit_id,
                    member_id=member_id,
                    fruit_name=Fruit.fruit_name,
                    vendor_name=Fruit.vendor_name,
                    quantity=Request['quantity'],
                    unitPrice=Request['unitPrice'],
                    totalPrice=Request['totalPrice'],
                    TradeDate=Request['TradeDate'],
                    predictedDate=Request['predictedDate'],
                    actualDate=Request['actualDate'],
                    PriceWithDiscount=Member.member_discount*Request['totalPrice'],
                    status="正常"
                    )
        if(Fruit.current_number-Trade.quantity>0):
            Fruit.current_number=Fruit.current_number-Trade.quantity
            db.session.add(Trade)
            flag=True
        elif(Fruit.current_number-Trade.quantity==0):
            Fruit.current_number=0
            Fruit.status="已刪除"
            db.session.add(Trade)
            flag = True
        db.session.commit()
    except sqlalchemy.exc.DatabaseError as e:
        return "欄位不符合標準"
    else:
        if(flag==True):
            return "成功添加交易資料"
        else:
            return "該水果數量不夠"
@app.route('/trade/delete',methods=['POST'])
def trade_delete():
    Request=request.get_json()['body']
    trade_id=Request['trade_id']
    Trade=trade.query.get(trade_id)
    Trade.status="已刪除"
    Fruit=fruit.query.get(Trade.fruit_id)
    Fruit.status="正常"
    Fruit.current_number=Fruit.current_number+Trade.quantity
    db.session.commit()
    return "成功刪除數據"
# @app.route('/trade/update', methods=['POST'])
@app.route('/trade/query', methods=['GET'])
def trade_queryget():
    Trade=trade.query.all()
    return jsonify(Trade)
@app.route('/trade/query', methods=['POST'])
def trade_querypost():
    Request=request.get_json()['body']
    fruit_id=Request['fruit_id']
    member_id=Request['member_id']
    if(member_id=="" and fruit_id==""):
        return trade.query.all()
    elif (member_id==""):
        return db.session.query(trade).filter_by(fruit_id=fruit_id).all()
    elif (fruit_id==""):
        return db.session.query(trade).filter_by(member_id=member_id).all()
with app.app_context():
    db.create_all()
if __name__ == '__main__':
    app.run()
