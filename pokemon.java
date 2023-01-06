package hw1207_1;
import java.util.*;
//定義玩家
class player
{
	private int pokemonSelect;
	private int skillSelect;
	private player enemy;
	private String name;
	private pokemon currentPokemon;
	private pokemon[] pokemons=new pokemon[3]; //玩家身上攜帶的寶可夢
	private int currentPokeMonNumber;
	public int gainPokemonSelect()
	{
		return this.pokemonSelect;
	}
	public void setPokemonSelect(int num)
	{
		this.pokemonSelect=num;
	}
	public void setEnemy(player enemy)
	{
		this.enemy=enemy;
	}
	public player gainEnemy()
	{
		return this.enemy;
	}
	public int gainSkillSelect()
	{
		return this.skillSelect;
	}
	public void changeSkillSelect(int select)
	{
		this.skillSelect=select;
	}
	public pokemon[] gainPokemons()
	{
		return this.pokemons;
	}
	public player(String name,pokemon pokemon1,pokemon pokemon2,pokemon pokemon3)
	{
		this.name=name;
		this.pokemons[0]=pokemon1; 
		this.pokemons[1]=pokemon2; 
		this.pokemons[2]=pokemon3; 
		this.currentPokemon=pokemon1;
	}
	public pokemon gainCurrent()
	{
		return this.currentPokemon;
	}
	public String gainName()
	{
		return this.name;
	}
	public void selectSkill(int skillnumber) //技能選擇
	{
		this.gainCurrent().targetSkill(skillnumber).attack(this.gainCurrent(),this.enemy);
	}
	public int LiveCount()
	{
		int a=0;
		for(pokemon i:this.pokemons)
		{
			if(i!=null)
			{
				if(i.IsAlive()==true)
				{
					a+=1;
				}
			}
		}
		return a;
	}
	public void showPokemons()
	{
		int a=1;
		for(pokemon i:pokemons)
		{
			if(i!=null)
			{
				System.out.print(a+"."+i.gainName()+" ");
				a++;
			}
		}
		System.out.println();
	}
	public void changeCurrent(int numToExchange)//更換寶可夢
	{		
		if(numToExchange!=currentPokeMonNumber)
		{
			if(numToExchange==1)
			{
				this.currentPokemon=pokemons[0];
				System.out.println(this.gainCurrent().gainName()+" ,come back!");
				System.out.println(pokemons[0].gainName()+",it's your turns!");
			}
			else if(numToExchange==2)
			{
				this.currentPokemon=pokemons[1];
				System.out.println(this.gainCurrent().gainName()+" ,come back!");
				System.out.println(pokemons[1].gainName()+",it's your turns!");
			}
			else if (numToExchange==3)
			{
				this.currentPokemon=pokemons[2];
				System.out.println(this.gainCurrent().gainName()+" ,come back!");
				System.out.println(pokemons[2].gainName()+",it's your turns!");
			}
		}
		else 
		{
			System.out.println("You are using this pokemon!");
		}
	}
}
//定義寶可夢
class pokemon
{
	protected int AccuracyLV=0;
	protected double hpLimit;
	protected String name;
	protected int level=50;
	protected double hp;
	protected attribute[] attribute;
	protected double attack;
	protected double specialAttack;
	protected double defense;
	protected double specialDefense;
	protected double speed;
	protected skill[] skills=new skill[4];
	protected int atkLV=0;
	protected int sAtkLV=0;
	protected int defLV=0;
	protected int sDefLV=0;
	protected int speedLV=0;
	public boolean IsAlive()
	{
		boolean flag=true;
		if(this.hp<=0)
			flag=false;
		else 
			flag=true;
		return flag;
	}
	public skill targetSkill(int i)
	{
		skill a;
		if(i>4||i<0)
		{
			a=null;
		}
		else
		{
			if(this.skills[i-1]==null||this.skills[i-1].gainSkillNumber()==0)
			{
				a=null;
			}
			else
			{
				a=this.skills[i-1];
			}
		}
		return a;
	}
	public int gainAccuracyLV()
	{
		return this.AccuracyLV;
	}
	public void changeAccuracyLV(int Level)
	{
		if(Level>0)
		{
			if(this.AccuracyLV<6)
			{
				System.out.println(name+"'s accuracy rate has increased!");
				this.AccuracyLV+=Level;
			}
			else
			{
				System.out.println(name+"'s accuracy rate has reached the upper limit!");
			}
		}
		else if(Level<0)
		{
			if(this.AccuracyLV>-6)
			{
				System.out.println(name+"'s accuracy rate has decreased!");
				this.AccuracyLV+=Level;
			}
			else
			{
				System.out.println(name+"'s accuracy has reached the lower limit!");
			}
		}
	}
	public void showSkill()
	{
		int a=1;
		for(skill i:skills)
		{
			if(i!=null)
			{
				System.out.print(a+"."+i.gainName()+" usable time:"+i.gainSkillNumber()+" ");
				a+=1;
			}
		}
		System.out.println();
	}
	//狀態變化
	public void changeAtkLV(int Level)
	{
		if(Level>0)
		{
			if(this.atkLV<6)
			{
				System.out.println(name+"'s attack has increased!");
				this.atkLV+=Level;
			}
			else
			{
				System.out.println(name+"'s attack has reached the upper limit!");
			}
		}
		else if(Level<0)
		{
			if(this.atkLV>-6)
			{
				System.out.println(name+"'s attack has decreased!");
				this.atkLV+=Level;
			}
			else
			{
				System.out.println(name+"'s attack has reached the lower limit!");
			}
		}
	}
	public void changeDefLV(int Level)
	{
		if(Level>0)
		{
			if(this.defLV<6)
			{
				System.out.println(name+"'s defense has increased!");
				this.defLV+=Level;
			}
			else
			{
				System.out.println(name+"'s defense has reached the upper limit!");
			}
		}
		else if(Level<0)
		{
			if(this.defLV>-6)
			{
				System.out.println(name+"'s defense has decreased!");
				this.defLV+=Level;
			}
			else
			{
				System.out.println(name+"'s defense has reached the lower limit!");
			}
		}
	}
	public void changeSAtkLV(int Level)
	{
		if(Level>0)
		{
			if(this.sAtkLV<6)
			{
				System.out.println(name+"'s special attack has increased!");
				this.sAtkLV+=Level;
			}
			else
			{
				System.out.println(name+"'s special attack has reached the upper limit!");
			}
		}
		else if(Level<0)
		{
			if(this.sAtkLV>-6)
			{
				System.out.println(name+"'s special attack has decreased!");
				this.sAtkLV+=Level;
			}
			else
			{
				System.out.println(name+"'s special attack has reached the lower limit!");
			}
		}
	}
	public void changeSDefLV(int Level)
	{
		if(Level>0)
		{
			if(this.sDefLV<6)
			{
				System.out.println(name+"'s special defense has increased!");
				this.sDefLV+=Level;
			}
			else
			{
				System.out.println(name+"'s special defense has reached the upper limit!");
			}
		}
		else if(Level<0)
		{
			if(this.sDefLV>-6)
			{
				System.out.println(name+"'s special defense has decreased!");
				this.sDefLV+=Level;
			}
			else
			{
				System.out.println(name+"'s special defense has reached the lower limit!");
			}
		}	
	}
	public void changeSpeedLV(int Level)
	{
		if(Level>0)
		{
			if(this.speedLV<6)
			{
				System.out.println(name+"'s speed has increased!");
				this.speedLV+=Level;
			}
			else
			{
				System.out.println(name+"'s speed has reached the upper limit!");
			}
		}
		else if(Level<0)
		{
			if(this.speed>-6)
			{
				System.out.println(name+"'s speed has decreased!");
				this.speedLV+=Level;
			}
			else
			{
				System.out.println(name+"'s speed has reached the lower limit!");
			}
		}
	}
	//取得屬性
	public int gainAtkLV()
	{
		return this.atkLV;
	}
	public int gainDefLV()
	{
		return this.defLV;
	}
	public int gainSAtkLV()
	{
		return this.sAtkLV;
	}
	public int gainSDefLV()
	{
		return this.sDefLV;
	}
	public int gainSpeedLV()
	{
		return this.speedLV;
	}
	public int gainLevel()
	{
		return this.level;
	}
	public double gainHP()
	{
		return this.hp;
	}
	public attribute[] gainAttribute()
	{
		return this.attribute;
	}
	public double gainAttack()
	{
		return this.attack;
	}
	public double gainSpecialAttack()
	{
		return this.specialAttack;
	}
	public double gainDefense()
	{
		return this.defense;
	}
	public double gainSpecialDefense()
	{
		return this.specialDefense;
	}
	public double gainSpeed()
	{
		return this.speed;
	}
	public String gainName()
	{
		return this.name;
	}
	public void setToZero()
	{
		this.atkLV=0;
		this.defLV=0;
		this.sAtkLV=0;
		this.sDefLV=0;
		this.speedLV=0;
	}
	public void onDamge(double damage)
	{
		this.hp-=damage;
	}
}
//噴火龍
class Charizard extends pokemon
{
	public Charizard(skill skill1,skill skill2,skill skill3,skill skill4)
	{
		this.name="Charizard";
		this.hp=185;
		this.attack=149;
		this.defense=143;
		this.specialAttack=177;
		this.specialDefense=150;
		this.speed=167;
		attribute[] array1= {new fire(),new flying()};
		this.attribute=array1;
		this.skills[0]=skill1;
		this.skills[1]=skill2;
		this.skills[2]=skill3;
		this.skills[3]=skill4;
	}
}
//水箭龜
class Blastoise extends pokemon
{
	public Blastoise(skill skill1,skill skill2,skill skill3,skill skill4)
	{
		this.name="Blastoise";
		this.hp=186;
		this.attack=148;
		this.defense=167;
		this.specialAttack=150;
		this.specialDefense=172;
		this.speed=143;
		attribute[] array1= {new water()};
		this.attribute=array1;
		this.skills[0]=skill1;
		this.skills[1]=skill2;
		this.skills[2]=skill3;
		this.skills[3]=skill4;
	}
}
//妙蛙花
class Venusaur extends pokemon
{
	public Venusaur(skill skill1,skill skill2,skill skill3,skill skill4)
	{
		this.name="Venusaur";
		this.hp=187;
		this.attack=147;
		this.defense=148;
		this.specialDefense=167;
		this.specialAttack=167;
		this.speed=145;
		this.attribute[0]=new poison();
		this.attribute[1]=new grass();
		this.skills[0]=skill1;
		this.skills[1]=skill2;
		this.skills[2]=skill3;
		this.skills[3]=skill4;
	}
}
//定義屬性
class attribute
{
	protected String Attribute; //自身屬性
	protected String[] effectiveAttribute= {}; //克制屬性
	protected String[] uneffectiveAttribute= {};//被克制屬性
	public String gainSelf()
	{
		return this.Attribute;
	}
	public String[] gainEff()
	{
		return this.effectiveAttribute;
	}
	public String[] gainUneff()
	{
		return this.uneffectiveAttribute;
	}
}
class fire extends attribute
{
	public fire()
	{
		this.Attribute="fire";
		String[] array1= {"grass"};
		this.effectiveAttribute=array1;
		String[] array2= {"fire","water"};
		this.uneffectiveAttribute=array2;
	}
}
class water extends attribute
{
	public water()
	{
		this.Attribute="water";
		String[] array1= {"fire"};
		this.effectiveAttribute=array1;
		String[] array2= {"grass","water"};
		this.uneffectiveAttribute=array2;
	}
}
class grass extends attribute
{
	public grass()
	{
		this.Attribute="grass";
		String[] array1= {"water"};
		this.effectiveAttribute=array1;
		String[] array2= {"poison","flying","fire","grass"};
		this.uneffectiveAttribute=array2;
	}
}
class poison extends attribute
{
	public poison()
	{
		this.Attribute="poison";
		String[] array1= {"grass"};
		this.effectiveAttribute=array1;
		String[] array2= {"poison"};
		this.uneffectiveAttribute=array2;
	}
}
class flying extends attribute
{
	public flying()
	{
		this.Attribute="flying";
		String[] array1= {"grass"};
		this.effectiveAttribute=array1;
	}
}
class basic extends attribute
{
	public basic()
	{
		this.Attribute="basic";
	}
}
//定義招式
class skill
{
	protected int EffectProbability; //附加效果機率
	protected int priority; //優先等級
	protected String name;
	protected int skillNumber;
	protected String skilltype;
	protected attribute attribute;
	protected int power;
	protected int AccuracyRate; //命中率
	public int gainSkillNumber()
	{
		return this.skillNumber;
	}
	public int gainEffProbability()
	{
		return this.EffectProbability;
	}
	public int gainPriority()
	{
		return this.priority;
	}
	public String gainSkillType()
	{
		return this.skilltype;
	}
	public void changeSkillNumber(int number)//改變技能次數
	{
		this.skillNumber+=number;
	}
	public String gainName()
	{
		return this.name;
	}
	public double damage(pokemon self,pokemon enemy) //無任何加成的傷害
	{
		double Damage=0;
		if(this.gainSkillType()=="physical") //物理攻擊
		{
			Damage=(2*self.gainLevel()+10)*self.gainAttack()*this.power*levelMagnification(self.gainAtkLV())
					/(250*enemy.gainDefense()*levelMagnification(enemy.gainDefLV()))+2;
		}
		else if(this.gainSkillType()=="special") //特殊攻擊
		{
			Damage=(2*self.gainLevel()+10)*self.gainSpecialAttack()*this.power*levelMagnification(self.gainSAtkLV())
					/(250*enemy.gainSpecialDefense()*levelMagnification(enemy.gainSDefLV()))+2;
		}
		return Damage;
	}
	public double levelMagnification(int statusLevel) //計算狀態等級的倍率
	{
		if(statusLevel>=0)
			return (2+statusLevel)/2.0;
		else 
			return 2.0/(2+statusLevel);
	}
	public double attributeMagnification(pokemon self,pokemon enemy) //屬性克制倍率
	{
		double a=1;
		for(attribute i:enemy.gainAttribute())
		{
			if(PokemonSystem.isInArray(i.Attribute,this.attribute.effectiveAttribute))
			{
				a*=2;
			}
			else if(PokemonSystem.isInArray(i.Attribute,this.attribute.uneffectiveAttribute))
			{
				a*=1/2.0;
			}
		}
		return a;
	}
	public void attack(player self){}
	public void attack(pokemon self,player enemy)
	{
		pokemon other=enemy.gainCurrent();
		System.out.println(self.gainName()+" are using "+this.gainName()+"!");
		Random rand=new Random();
		int i=rand.nextInt(100);
		double Damage=this.damage(self,other)*this.attributeMagnification(self,other);
		if(i<this.AccuracyRate*levelMagnification(self.gainAccuracyLV())) //命中
		{
			//攻擊效果顯示
			if(attributeMagnification(self,other)>=2)
				System.out.println("It is very effective!");
			else
				System.out.println("It seem not very effecive...");
			other.onDamge(Math.round(Damage));
			System.out.println(enemy.gainName()+"'s "+other.gainName()+" has decresed "+Math.round(Damage)+" hp!");
			if(other.gainHP()>0)
			{
				System.out.println(enemy.gainName()+"'s "+other.gainName()+" have "+(int)other.gainHP()+" hp left.");
				effect(this.EffectProbability);
			}
			else
				System.out.println(enemy.gainName()+"'s "+other.gainName()+" fall down");
			System.out.println();
		}
		else //未命中
		{
			System.out.println("But it missed.");
			System.out.println();
		}
	}
	public void effect(int probability){}
}
//強化,變化類招式
class shellSmash extends skill //破殼
{
	public shellSmash() { 
		this.priority=2;
		this.skilltype="nonAttack";
		this.name="shellSmash";
		this.skillNumber=15;
		this.attribute=new basic();
	}
	public void attack(player player)
	{
		System.out.println(player.gainName()+"'s "+player.gainCurrent().gainName()+" are using "+this.gainName());
		if (skillNumber>0)
		{
			player.gainCurrent().changeDefLV(-1);
			player.gainCurrent().changeSDefLV(-1);
			player.gainCurrent().changeAtkLV(2);
			player.gainCurrent().changeSAtkLV(2);
			player.gainCurrent().changeSpeedLV(2);
			System.out.println();
			this.changeSkillNumber(-1);
		}
		else
		{
			System.out.println("But "+player.gainName()+"'s "+player.gainCurrent()+"'s skill number of "+this.name+" is run out!");
		}
	}
}
//攻擊,干擾類招式
class FlameThrower extends skill //噴射火焰
{
	public FlameThrower()
	{
		this.priority=2;
		this.name="FlameThrower";
		this.skillNumber=15;
		this.skilltype="special";
		this.attribute=new fire();
		this.power=90;
		this.AccuracyRate=100;
	}
	public void working(player player,player enemy)
	{
	}
}
//對戰類別
class battleSystem
{
	private static player[] changePokemon=new player[2];
	private static player[] first=new player[2];
	private static player[] speed=new player[2];
	private static player[] last=new player[2];
	private static int player1=0;
	private static int player2=0;
	private static int round=1;
	public static void setChange(int player,int numberToChange)
	{
		player=numberToChange;
	}
	public static void setChange()
	{
		player1=0;
		player2=0;
	}
	public static double levelMagnification(int statusLevel) //計算狀態等級的倍率
	{
		if(statusLevel>=0)
			return (2+statusLevel)/2.0;
		else 
			return 2.0/(2+statusLevel);
	}
	public static void diologue(player player) //決定行動階段系統跟玩家的對話
	{
		boolean flag=true;
		while(flag)
		{
			Scanner sc=new Scanner(System.in);
			int select;
			System.out.println("1.skill 2.change pokemon\n"
			+player.gainName()+",what do you want to do?");
			select=sc.nextInt();
			if(select==2)//換寶可夢
			{
				player.showPokemons();
				System.out.println("which pokemon do you want to select?");
				select=sc.nextInt();
				if(player.gainPokemons()[select-1].IsAlive()==false||player.gainPokemons()[select-1]==null)
				{
					if(player.gainPokemons()[select-1].IsAlive()==false)
						System.out.println("This pokemon can not fight anymore!");
					else
						System.out.println("This pokemon does not exist!");
				}
				else 
				{
					player.changeCurrent(select);
					flag=false;
				}
			}
			else if(select==1) //使用技能
			{
				System.out.println(player.gainName()+",what skill do you want "+player.gainCurrent().gainName()+" to do?");
				player.gainCurrent().showSkill();
				select=sc.nextInt();
				if(player.gainCurrent().targetSkill(select)==null)
				{
					System.out.println("this skill can not be used!");
					continue;
				}
				else
				{
					player.changeSkillSelect(select);
					if(player.gainCurrent().targetSkill(select).gainPriority()==1)
					{
						append(first,player);
					}
					else if(player.gainCurrent().targetSkill(select).gainPriority()==2)
					{
						append(speed,player);
					}
					else if(player.gainCurrent().targetSkill(select).gainPriority()==3)
					{
						append(last,player);
					}
					flag=false;
				}
			}
		}
		System.out.println();
	}
	public static void exchanging()
	{
		for(player i:changePokemon)
		{
			if(i!=null)
			{
				i.changeCurrent(i.gainSkillSelect());
			}
		}
	}
	public static void compareSpeed() //比較速度並進行交換
	{
		player a=speed[0];
		player b=speed[1];
		//等效速度=原本的速度*屬性倍率
		if(a!=null&&b!=null)
		{
			double speedA=a.gainCurrent().gainSpeed()*(levelMagnification(a.gainCurrent().gainSpeedLV())); 
			double speedB=b.gainCurrent().gainSpeed()*(levelMagnification(b.gainCurrent().gainSpeedLV()));
			if(speedA<speedB)
			{
				swap(speed);
			}
		}
	}
	public static void exchangeByRandom(player[] array)
	{
		Random rand=new Random();
		int i=rand.nextInt(2);
		if(i==1)
		{
			swap(array);
		}
	}
	public static void attackStage(player[] array) //在雙方都還有能戰鬥的pokemon的情況下才攻擊
	{
		for(player i:array)
		{
			if(i!=null)
			{
				if(i.LiveCount()>0&&i.gainEnemy().LiveCount()>0)
				{
					System.out.print(i.gainName()+"'s ");
					i.selectSkill(i.gainSkillSelect());
				}
			}
		}
	}
	public static void fight(player player1,player player2)
	{
		player1.setEnemy(player2);
		player2.setEnemy(player1);
		boolean flag=true;
		while(flag)
		{
			System.out.println("Round "+round);
			//決定動作階段
			diologue(player1);
			diologue(player2);
			//換寶可夢
			exchanging();
			//先手
			exchangeByRandom(first);
			attackStage(first);
			//速度比拚
			compareSpeed();
			attackStage(speed);
			//後手
			exchangeByRandom(last);
			attackStage(last);
			//回合結束動作
			setNull();
			round++;
			player1.setPokemonSelect(0);
			player1.setPokemonSelect(0);
			player1.changeSkillSelect(0);
			player2.changeSkillSelect(0);
			System.out.println("-------------------------");
			if(player1.LiveCount()==0||player2.LiveCount()==0)
			{
				if(player1.LiveCount()==0)
				{
					round=1;
					System.out.println(player1.gainName()+" has no pokemon to change.");
					System.out.println("The winner is "+player2.gainName()+"!");
					flag=false;
				}
				else if(player2.LiveCount()==0)
				{
					round=1;
					System.out.println(player2.gainName()+" has no pokemon to change.");
					System.out.println("The winner is "+player1.gainName()+"!");
					flag=false;
				}
			}
					
		}
	}
	public static void append(player[] array,player player) //要改
	{
		int i=0;
		while(array[i]!=null)
		{
			i+=1;
		}
		array[i]=player;
	}
	public static void swap(player[] array)
	{
		player a=array[0];
		array[0]=array[1];
		array[1]=a;
	}
	public static void setNull()
	{
		player[] array= {null,null};
		changePokemon=array;
		first=array;
		speed=array;
		last=array;
	}
}
//主類別
public class PokemonSystem
{
	public static void main(String[] args)
	{	
		Scanner sc=new Scanner(System.in);
		player player1=new player("Alex",new Charizard(new FlameThrower(),null,null,null),
				new Blastoise(null,null,null,null),
				null);
		player player2=new player("Brian",new Charizard(null,null,null,null),
				new Blastoise(null,null,null,null),
				null);
		boolean flag=true;
		while(flag)
		{
			battleSystem.fight(player1, player2);
			System.out.print("Continue to play? 1.yes 2.no:");
			int answer=sc.nextInt();
			if(answer==2)
				flag=false;
		}
	}
	public static boolean isInArray(String i,String[] array)
	{
		boolean a=false;
		for(int j=0;j<array.length;j++)
		{
			if(i==array[j])
			{
				a=true;
			}
		}
		return a;
	}	
}
