package com.kunlez.blog.common;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonMethot {

    public static String getLinkImgFollowFormat(String userName, String imgName) {
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        return userName + dateFormat.format(new Date()) + imgName;
    }

    public static String getUserName() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        return username;
    }

    public static String getStringStandard(String str) {

        str = str.replace(".", ". ");
        str = str.replace(",", ", ");
        str = str.replace("!", "! ");
        str = str.replace("?", "? ");

        while (str.replace("  ", " ") != str) {
            str = str.replace("  ", " ");
        }

        StringBuffer strResult = new StringBuffer(str);

        if (strResult.charAt(0) > 96) {
            strResult.setCharAt(0, (char) (strResult.charAt(0) - 32));
        }

        StringBuffer strTemp = new StringBuffer(strResult);
        for (int i = 1; i < strResult.length(); ++i) {
            if (strResult.charAt(i) == '.' || strResult.charAt(i) == '?' || strResult.charAt(i) == '!') {

                if (strResult.charAt(i - 1) == ' ') {
                    strResult.delete(i - 1, i);
                    i--;
                }
                if (strResult.charAt(i += 2) > 96) {
                    strResult.setCharAt(i, (char) (strResult.charAt(i) - 32));
                }
            }
        }

        return strResult.toString();
    }
}
