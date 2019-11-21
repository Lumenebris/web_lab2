package lab_2;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class AreaCheckServlet extends HttpServlet {

    private ServletConfig config;
    private List<Point> list = null;
    private Point p;

    @Override
    public void init(ServletConfig config) throws ServletException {
        this.config = config;
    }

    @Override
    public void destroy() {
    }

    @Override
    public ServletConfig getServletConfig() {
        return config;
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (list == null) {
            list = new ArrayList<Point>();
            request.getSession().setAttribute("list", list);

        }
        try {
            double x = Double.parseDouble(request.getParameter("x_v").trim());
            double y = Double.parseDouble(request.getParameter("y_v").trim());
            double r = Double.parseDouble(request.getParameter("r_v").trim());

        p = new Point(x, y, r);
        p.setInArea(p.checkArea(p.getX(), p.getY(), p.getR()));
        list.add(p);

        } catch (Exception e) {
            e.printStackTrace();
            request.getSession().setAttribute("list", list);
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }
        response.setContentType("text/html; charset=UTF-8");
        request.getSession().setAttribute("list", list);
        request.getServletContext().getRequestDispatcher("/table.jsp").include(request, response);
    }
}

