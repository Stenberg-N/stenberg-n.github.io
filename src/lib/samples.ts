import dedent from 'ts-dedent';
import type { CodeSample } from './types';

export const samples: CodeSample[] = [
	{
		slug: 'c_sharp',
    samples: [
      {
        title: 'samples.c_sharp.ex1.title',
        code: dedent`
          using System;
          using System.Collections.Generic;
          using System.IO;
          using static palkanlaskenta.Program;

          namespace palkanlaskenta
          {
              internal class Program
              {
                  static void Main()
                  {
                      Employeelist myList = new Employeelist();
                      myList.Menu();
                  }
                  public class Employeelist
                  {
                      public List<Employee> employees = new List<Employee>();
                      PayrollSystem payroll = new PayrollSystem();
                      int nextEmployeeId = 1;
                      public void Menu()
                      {
                          string value;

                          do
                          {
                              Console.WriteLine("Palkanlaskenta");
                              Console.WriteLine("==============");
                              Console.WriteLine("(1) Lisää työntekijöitä");
                              Console.WriteLine("(2) Kirjoita työntekijät tiedostoon");
                              Console.WriteLine("(3) Lue työntekijät tiedostosta");
                              Console.WriteLine("(4) Tulosta palkkalaskelma");
                              Console.WriteLine("(0) Lopeta");
                              Console.Write("Valitse toiminto: ");

                              value = Console.ReadLine();
                              Console.WriteLine();

                              switch (value)
                              {
                                  case "1":
                                      TypeMenu();
                                      break;
                                  case "2":
                                      WriteToFile();
                                      break;
                                  case "3":
                                      ReadFromFile();
                                      break;
                                  case "4":
                                      payroll.CalculatePayroll(employees);
                                      break;
                                  case "0":
                                      break;
                                  default:
                                      Console.WriteLine("Virheellinen valinta");
                                      break;
                              }
                          } while (value != "0");
                      }

                      public void TypeMenu()
                      {
                          while (true)
                          {
                              Console.WriteLine("Palkkatyyppi");
                              Console.WriteLine("------------");
                              Console.WriteLine("(1) Kuukausi");
                              Console.WriteLine("(2) Tunti");
                              Console.WriteLine("(3) Komissio");
                              Console.WriteLine("(0) Lopeta");
                              Console.Write("Anna palkkatyyppi: ");
                              string type = Console.ReadLine();

                              switch (type)
                              {
                                  case "1":
                                  case "2":
                                  case "3":
                                      InsertType(type);
                                      break;
                                  case "0": return;
                              }
                          }
                      }

                      public void InsertType(string type)
                      {
                          string name = " ";

                          Console.Write("Anna työntekijän nimi: ");
                          name = Console.ReadLine();

                          if (name == "0") return;

                          switch (type)
                          {
                              case "1":
                                  var salariedEmp = new SalaryEmployee(nextEmployeeId++, name, 0);
                                  salariedEmp.AskSalary();
                                  employees.Add(salariedEmp);
                                  break;
                              case "2":
                                  var hourlyEmp = new HourlyEmployee(nextEmployeeId++, name, 0, 0);
                                  hourlyEmp.AskSalary();
                                  employees.Add(hourlyEmp);
                                  break;
                              case "3":
                                  var commissionEmp = new CommissionEmployee(nextEmployeeId++, name, 0, 0);
                                  commissionEmp.AskSalary();
                                  employees.Add(commissionEmp);
                                  break;
                          }
                      }

                      public void WriteToFile()
                      {
                          string file = "employees.csv";
                          File.WriteAllText(file, "");

                          List<string> lines = new List<string>();
                          foreach (var employee in employees)
                          {
                              if (employee is SalaryEmployee sal && !(employee is CommissionEmployee))
                              {
                                  string[] row = new string[]
                                  {
                                      sal.Id.ToString(),
                                      sal.Name,
                                      "S",
                                      sal.MonthlySalary.ToString()
                                  };
                                  File.AppendAllText(file, MyJoin(row, ',') + "\\n");
                              }
                              else if (employee is HourlyEmployee hour)
                              {
                                  string[] row = new string[]
                                  {
                                      hour.Id.ToString(),
                                      hour.Name,
                                      "H",
                                      hour.HourRate.ToString(),
                                      hour.HoursWorked.ToString()
                                  };
                                  File.AppendAllText(file, MyJoin(row, ',') + "\\n");
                              }
                              else if (employee is CommissionEmployee com)
                              {
                                  string[] row = new string[]
                                  {
                                      com.Id.ToString(),
                                      com.Name,
                                      "C",
                                      com.MonthlySalary.ToString(),
                                      com.Commission.ToString()
                                  };
                                  File.AppendAllText(file, MyJoin(row, ',') + "\\n");
                              }
                          }
                          Console.WriteLine(employees.Count + " työntekijä(ä) lisätty tiedostoon " + file);
                      }

                      public void ReadFromFile()
                      {
                          string file = "employees.csv";
                          employees.Clear();

                          if (!File.Exists(file))
                          {
                              Console.WriteLine("Tiedostoa ei löydy: " + file);
                          }

                          string[] fileLines = File.ReadAllLines(file);
                          foreach (string line in fileLines)
                          {
                              if (string.IsNullOrWhiteSpace(line)) continue;

                              string[] parts = MySplit(line, ',');
                              switch (parts[2])
                              {
                                  case "S":
                                      employees.Add(new SalaryEmployee(
                                          int.Parse(parts[0]),
                                          parts[1],
                                          int.Parse(parts[3])
                                      ));
                                      break;

                                  case "H":
                                      employees.Add(new HourlyEmployee(
                                          int.Parse(parts[0]),
                                          parts[1],
                                          int.Parse(parts[3]),
                                          int.Parse(parts[4])
                                      ));
                                      break;

                                  case "C":
                                      employees.Add(new CommissionEmployee(
                                          int.Parse(parts[0]),
                                          parts[1],
                                          int.Parse(parts[3]),
                                          int.Parse(parts[4])
                                      ));
                                      break;
                              }
                          }
                          Console.WriteLine(employees.Count + " työntekijä(ä) luettu tiedostosta " + file);
                      }

                      private static string[] MySplit(string stringToSplit, char delimiter)
                      {
                          List<string> result = new List<string>();
                          int startIdx = 0;
                          int idx;

                          while ((idx = stringToSplit.IndexOf(delimiter, startIdx)) != -1)
                          {
                              result.Add(stringToSplit.Substring(startIdx, idx - startIdx));
                              startIdx = idx + 1;
                          }

                          result.Add(stringToSplit.Substring(startIdx));
                          return result.ToArray();
                      }

                      private static string MyJoin(string[] stringArray, char separator)
                      {
                          string result = "";
                          for (int i = 0; i < stringArray.Length; i++)
                          {
                              result += stringArray[i];
                              if (i < stringArray.Length - 1) result += separator;
                          }

                          return result;
                      }

                      public void Print()
                      {
                          foreach (var employee in employees)
                          {
                              employee.Print();
                          }
                      }

                  }
                  public class PayrollSystem
                  {
                      public void CalculatePayroll(List<Employee> employees)
                      {
                          foreach (var employee in employees)
                          {
                              Console.WriteLine("Palkkalaskelma");
                              Console.WriteLine("==============");
                              Console.WriteLine($"Henkilölle: {employee.Id} - {employee.Name}");
                              Console.WriteLine($"- Maksetaan: {employee.CalculateSalary()}");
                              Console.WriteLine();
                          }
                      }
                  }
                  public class Employee
                  {
                      public virtual int Id { get; set; }
                      public virtual string Name { get; set; }

                      public Employee() { }
                      public Employee(int id, string name)
                      {
                          Id = id;
                          Name = name;
                      }
                      public virtual void AskSalary() { }
                      public virtual int CalculateSalary()
                      {
                          return 0;
                      }
                      public virtual void Print()
                      {
                          Console.WriteLine("Id: " + Id + " Nimi: " + Name);
                      }
                  }
                  public class SalaryEmployee : Employee
                  {
                      public override int Id { get; set; }
                      public override string Name { get; set; }
                      public int MonthlySalary { get; set; }

                      public SalaryEmployee() { }

                      public SalaryEmployee(int id, string name, int salary)
                      {
                          Id = id;
                          Name = name;
                          MonthlySalary = salary;
                      }

                      public override void AskSalary()
                      {
                          Console.Write("Anna kuukausipalkka: ");
                          MonthlySalary = Convert.ToInt32(Console.ReadLine());
                      }
                      public override int CalculateSalary()
                      {
                          return MonthlySalary;
                      }
                      public override void Print()
                      {
                          Console.WriteLine("Id: " + Id + " Nimi: " + Name + " Palkka: " + CalculateSalary());
                      }
                  }

                  public class HourlyEmployee : Employee
                  {
                      public int HourRate { get; set; }
                      public int HoursWorked { get; set; }

                      public HourlyEmployee() { }

                      public HourlyEmployee(int id, string name, int hourRate, int hoursWorked)
                      {
                          Id = id;
                          Name = name;
                          HourRate = hourRate;
                          HoursWorked = hoursWorked;
                      }

                      public override void AskSalary()
                      {
                          Console.Write("Anna tuntipalkka: ");
                          HourRate = Convert.ToInt32(Console.ReadLine());
                          Console.Write("Anna tehdyt tunnit: ");
                          HoursWorked = Convert.ToInt32(Console.ReadLine());
                      }

                      public override int CalculateSalary()
                      {
                          return HourRate * HoursWorked;
                      }

                      public override void Print()
                      {
                          Console.WriteLine("Id: " + Id + " Nimi: " + Name + " Palkka: " + CalculateSalary());
                      }
                  }

                  public class CommissionEmployee : SalaryEmployee
                  {
                      public int Commission { get; set; }
                      public CommissionEmployee() { }
                      public CommissionEmployee(int id, string name, int monthlySalary, int commission)
                      {
                          Id = id;
                          Name = name;
                          MonthlySalary = monthlySalary;
                          Commission = commission;
                      }

                      public override void AskSalary()
                      {
                          base.AskSalary();
                          Console.Write("Anna komissio: ");
                          Commission = Convert.ToInt32(Console.ReadLine());
                      }

                      public override int CalculateSalary()
                      {
                          return MonthlySalary + Commission;
                      }

                      public override void Print()
                      {
                          Console.WriteLine("Id: " + Id + " Nimi: " + Name + " Palkka: " + CalculateSalary());
                      }
                  }
              }
          }
        `
      },
      {
        title: 'samples.c_sharp.ex2.title',
        code: dedent`
          using System;
          using System.Collections.Generic;
          using System.IO;
          using System.Xml.Serialization;

          [Serializable]
          public class Leffa
          {
              public string Nimi;
              public int Kesto;
              public int Vuosi;

              public Leffa() { }
              public Leffa(string nimi, int kesto, int vuosi)
              {
                  this.Nimi = nimi;
                  this.Kesto = kesto;
                  this.Vuosi = vuosi;
              }
          }

          public class KatseluLoki
          {
              private List<Leffa> leffat = new List<Leffa>() { };
              private string[] options = { "Lisää Leffa", "Poista Leffa", "Näytä Raportti", "Lataa Tietokanta", "Tallenna Tietokanta", "Lopeta" };
              static void Main()
              {
                  KatseluLoki katseluLoki = new KatseluLoki();
                  
                  while(true) {
                      Console.WriteLine(Environment.NewLine);
                      Console.WriteLine("Leffojen Katseluloki");
                      Console.WriteLine("====================");

                      for (int i = 0; i < katseluLoki.options.Length; i++)
                      {
                          Console.WriteLine($"{i+1}) {katseluLoki.options[i]}");
                      }

                      Console.Write("Syöte: ");
                      string inputLine = Console.ReadLine();
                      Console.Write(Environment.NewLine);

                      if (int.TryParse(inputLine, out int userChoice))
                      {
                          if (userChoice <= 0 || userChoice >= 7) { Console.WriteLine("Valitse 1-6!"); continue; }

                          switch(userChoice)
                          {
                              case 1: katseluLoki.Lisaa(); break;
                              case 2: katseluLoki.Poista(); break;
                              case 3: katseluLoki.Raportti(); break;
                              case 4: katseluLoki.LataaDB(); break;
                              case 5: katseluLoki.TallennaDB(); break;
                              case 6: katseluLoki.Lopeta(); break;
                          }
                      }
                      else
                      {
                          Console.WriteLine("Virheellinen syöte");
                          continue;
                      }
                  }
              }

              private void Lisaa()
              {
                  Console.WriteLine(options[0] + ":");
                  Console.Write("Nimi:");
                  string inputNimi = Console.ReadLine();
                  Console.Write("Kesto (min):");
                  int inputKesto = Convert.ToInt32(Console.ReadLine());
                  Console.Write("Vuosi:");
                  int inputVuosi = Convert.ToInt32(Console.ReadLine());

                  if (inputNimi == null) return;

                  if (inputNimi.Trim().Length > 0 && inputKesto >= 0 && inputVuosi >= 0)
                  {
                      leffat.Add(new Leffa(inputNimi, inputKesto, inputVuosi));
                  }
                  else
                  {
                      Console.WriteLine("Leffan lisäyksen syötteet virhellisiä");
                      return;
                  }
              }

              private void Poista()
              {
                  Console.WriteLine(options[1] + ":");

                  int i = 0;
                  foreach (Leffa leffa in leffat)
                  {
                      Console.WriteLine($"{i+1}) {leffa.Nimi} ({leffa.Vuosi}), {leffa.Kesto} minuuttia.  ");
                      i++;
                  }

                  Console.Write("Syöte: ");
                  string userInput = Console.ReadLine() + Environment.NewLine;

                  if (int.TryParse(userInput, out int userChoice))
                  {
                      if (userChoice <= 0) return;
                      leffat.RemoveAt(userChoice - 1);
                  }
                  else
                  {
                      Console.WriteLine("Virheellinen syöte");
                  }
              }

              private void Raportti()
              {
                  int yhteiskesto = 0;
                  foreach (Leffa leffa in leffat)
                  {
                      Console.WriteLine($"{leffa.Nimi} ({leffa.Vuosi}), {leffa.Kesto} minuuttia.  ");
                      yhteiskesto += leffa.Kesto;
                  }
                  Console.Write(Environment.NewLine);
                  Console.WriteLine($"Leffoja katsottu yhteensä {leffat.Count}, yhteiskesto {yhteiskesto} minuuttia.");
              }

              private void LataaDB()
              {
                  XmlSerializer serializer = new XmlSerializer(typeof(List<Leffa>));

                  bool success = false;
                  try
                  {
                      using (StreamReader sr = new StreamReader("tietokanta.xml"))
                      {
                          leffat = (List<Leffa>) serializer.Deserialize(sr);
                          sr.Close();
                      }
                      success = true;
                  }
                  catch (Exception ex)
                  {
                      Console.WriteLine("Virhe deserialisoinnissa: " + ex.Message);
                  }

                  if (success)
                  {
                      Console.WriteLine("Tietokanta ladattu.");
                  }
                  else
                  {
                      Console.WriteLine("Tietokannan lataamisessa tapahtui virhe.");
                  }
              }

              private void TallennaDB()
              {
                  XmlSerializer serializer = new XmlSerializer(typeof(List<Leffa>));

                  bool success = false;
                  try
                  {
                      using (StreamWriter sw = new StreamWriter("tietokanta.xml"))
                      {
                          serializer.Serialize(sw, leffat);
                          sw.Close();
                      }
                      success = true;
                  }
                  catch (Exception ex)
                  {
                      Console.WriteLine("Virhe serialisoinnissa: " + ex.Message);
                  }

                  if (success)
                  {
                      Console.WriteLine("Tietokanta tallennettu.");
                  }
                  else
                  {
                      Console.WriteLine("Tietokannan tallentamisessa tapahtui virhe.");
                  }
              }

              private void Lopeta()
              {
                  Environment.Exit(0);
              }
          }
        `
      }
    ]
	},
];
