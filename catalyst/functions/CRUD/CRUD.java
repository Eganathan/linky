import java.util.logging.Logger;
import java.util.logging.Level;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.catalyst.advanced.CatalystAdvancedIOHandler;
import com.zc.component.ZCUserDetail;
import com.zc.component.users.ZCUser;
import org.json.JSONObject;

public class CRUD implements CatalystAdvancedIOHandler {
    private static final Logger LOGGER = Logger.getLogger(CRUD.class.getName());

    @Override
    public void runner(HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            switch (request.getRequestURI()) {
                case "/users/current": {
                    try {
                        ZCUserDetail currentUser = ZCUser.getInstance().getCurrentUser();

                        JSONObject json = new JSONObject();
                        json.put("status", "success");
                        json.put("user", currentUser);

                        response.setStatus(200);
                        response.setContentType("application/json");
                        response.setCharacterEncoding("UTF-8");
                        response.getWriter().write(json.toString());
                    } catch (Exception e) {
                        response.setStatus(500);
                        response.getWriter().write(e.getLocalizedMessage());
                    }
                    break;
                }
                case "/somethingElse": {
                    break;
                }
                default: {
                    response.setStatus(404);
                    response.getWriter().write("You might find the page you are looking for at \"/\" path");
                }
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Exception in CRUD", e);
            response.setStatus(500);
            response.getWriter().write("Internal server error");
        }
    }

}