// Variables in js are lexically scoped
// which means that the structure of the program
// before running it determines from where the
// variable can be accessed from
// Not from where the function is called


// In Java variables are block scoped
public static void main(String[] args) {
  {
    int foo = 4;
  }
  System.out.println(foo);// error
}
// In JS variables are function scoped
function main() {
  {
    var foo = 4;
  }
  console.log(foo);// 4
}
