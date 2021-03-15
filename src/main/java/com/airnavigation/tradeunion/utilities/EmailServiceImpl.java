package com.airnavigation.tradeunion.utilities;

import com.airnavigation.tradeunion.domain.PlainDomain.FeedbackFile;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.List;

@Component
public class EmailServiceImpl {

    private final JavaMailSender emailSender;

    @Autowired
    public EmailServiceImpl (JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    //TODO: beatify the mail
    public void sendMimeMessage(String to, String subject, String from, String text, List<FeedbackFile> files) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setFrom(from);
        helper.setText(text, true);
        helper.addInline("logo", new File("src/main/resources/static/logo.png"));
        helper.addInline("arrow", new File("src/main/resources/static/arrow_outline.png"));
        for (FeedbackFile file: files) {
            String fullBase64 = file.getBase64().split("base64,", 2)[1];
            System.out.println(fullBase64);
            byte[] data = Base64.decodeBase64(fullBase64);
            try {
                InputStreamSource stream = new ByteArrayResource(data);
                helper.addAttachment(file.getName(), stream);
            } catch (MessagingException e) {
                throw new MessagingException(e.getLocalizedMessage());
            }
        }
        emailSender.send(message);
    }
}
