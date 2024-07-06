package ping;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import ping.Main;

public class KirbyTest {

   @Test 
   public void testComplete() {
       assertEquals(54, Main.completeMe(), "completeMe should return 54");
   }

    @Test
    public void testFibo() {
        // foo
        assertEquals(0, Main.fibo(0), "fibo(0) should be 0");
        assertEquals(1, Main.fibo(1), "fibo(1) should be 1");
        assertEquals(1, Main.fibo(2), "fibo(2) should be 1");
        assertEquals(2, Main.fibo(3), "fibo(3) should be 2");
        assertEquals(3, Main.fibo(4), "fibo(4) should be 3");
        assertEquals(5, Main.fibo(5), "fibo(5) should be 5");
        assertEquals(8, Main.fibo(6), "fibo(6) should be 8");
        assertEquals(13, Main.fibo(7), "fibo(7) should be 13");
        assertEquals(21, Main.fibo(8), "fibo(8) should be 21");
        assertEquals(34, Main.fibo(9), "fibo(9) should be 34");
        assertEquals(55, Main.fibo(10), "fibo(10) should be 55");
    }
}
