package ru.denis.media.service;

import org.springframework.stereotype.Service;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

@Service
public class ImageProcessorService {
    public void resizeAndCompress(InputStream inputStream, OutputStream outputStream, int width, int height) throws IOException {
        if (inputStream == null || inputStream.available() == 0) {
            throw new IllegalArgumentException("InputStream is empty or null");
        }

        BufferedImage image = ImageIO.read(inputStream);
        if (image == null) {
            throw new IOException("Failed to read image. Unsupported format or invalid data.");
        }

        BufferedImage resizedImage = resizeImage(image, width, height);

        ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/jpeg").next();
        ImageWriteParam param = writer.getDefaultWriteParam();

        if (param.canWriteCompressed()) {
            param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            param.setCompressionQuality(0.8f);
        }

        try (ImageOutputStream ios = ImageIO.createImageOutputStream(outputStream)) {
            writer.setOutput(ios);
            writer.write(null, new IIOImage(resizedImage, null, null), param);
        } finally {
            writer.dispose();
        }
    }


    public BufferedImage resizeImage(BufferedImage originalImage, int width, int height) {
        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();
        float scale = Math.max((float) width / originalWidth, (float) height / originalHeight);
        int scaledWidth = Math.round(originalWidth * scale);
        int scaledHeight = Math.round(originalHeight * scale);

        BufferedImage scaledImage = new BufferedImage(scaledWidth, scaledHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = scaledImage.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.drawImage(originalImage, 0, 0, scaledWidth, scaledHeight, null);
        g.dispose();

        int x = (scaledWidth - width) / 2;
        int y = (scaledHeight - height) / 2;

        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }

        BufferedImage croppedImage = scaledImage.getSubimage(x, y, Math.min(width, scaledWidth - x), Math.min(height, scaledHeight - y));
        BufferedImage finalImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        g = finalImage.createGraphics();
        g.drawImage(croppedImage, 0, 0, width, height, null);
        g.dispose();

        return finalImage;
    }
}
