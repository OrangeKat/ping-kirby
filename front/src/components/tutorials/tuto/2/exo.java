package ping;

public class Main {
    public static int completeMe() {
        //your code goes here
        int a = 27;
        int b = 27;
        return a + b;
    }

    //triple function goes here

    public static int fibo(int n) {
        //your code goes here
        int f0 = 0;
        int f1 = 1;
        int temp;
        while (n > 0) {
            temp = f1;
            f1 += f0;
            f0 = temp;
            n--;
        }
        return f0;
    }
}
