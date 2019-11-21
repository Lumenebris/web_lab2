package lab_2;

import java.io.Serializable;

public class Point implements Serializable {
    private double x;
    private double y;
    private double R;
    private boolean isInArea;

    Point(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.R = r;
    }

    public double getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return R;
    }

    public void setR(double r) {
        R = r;
    }

    public boolean isInArea() {
        return isInArea;
    }

    public void setInArea(boolean inArea) {
        isInArea = inArea;
    }

    public boolean checkArea(double x, double y, double R) {
        boolean square = ((x <= 0) && (y <= 0) && (x >= -(R/2)) && (y >= (-R)));
        boolean triangle = ((x <= 0) && (y >= 0) && (x >= (y - (R/2))) && (y <= (R/2)));
        boolean circle = ((y <= 0) && (x >= 0) && ((Math.pow(x,2) + Math.pow(y,2)) <= (Math.pow(R, 2))));

        return square || triangle || circle;
    }
}