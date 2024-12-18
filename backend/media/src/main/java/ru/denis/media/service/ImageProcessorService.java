package ru.denis.media.service;

import org.springframework.stereotype.Service;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.ConvolveOp;
import java.awt.image.Kernel;
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

    public void resizeAndBlur(InputStream inputStream, OutputStream outputStream, int width, int height, float blurRadius) throws IOException {
        if (inputStream == null || inputStream.available() == 0) {
            throw new IllegalArgumentException("InputStream is empty or null");
        }

        BufferedImage image = ImageIO.read(inputStream);
        if (image == null) {
            throw new IOException("Failed to read image. Unsupported format or invalid data.");
        }

        BufferedImage resizedImage = resizeImage(image, width, height);

        BufferedImage blurredImage = blurImage(resizedImage, blurRadius);

        ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/jpeg").next();
        ImageWriteParam param = writer.getDefaultWriteParam();
        if (param.canWriteCompressed()) {
            param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            param.setCompressionQuality(0.8f);
        }

        try (ImageOutputStream ios = ImageIO.createImageOutputStream(outputStream)) {
            writer.setOutput(ios);
            writer.write(null, new IIOImage(blurredImage, null, null), param);
        } finally {
            writer.dispose();
        }
    }

    public BufferedImage blurImage(BufferedImage image, float radius) {
        if (radius < 1) {
            throw new IllegalArgumentException("Radius must be >= 1");
        }

        int size = (int) Math.ceil(radius * 2) + 1;
        float[] data = new float[size * size];
        float sigma = radius / 3;
        float sigma22 = 2 * sigma * sigma;
        float sigmaPi2 = (float) (2 * Math.PI * sigma * sigma);
        int radiusInt = size / 2;
        float total = 0;

        for (int y = -radiusInt; y <= radiusInt; y++) {
            for (int x = -radiusInt; x <= radiusInt; x++) {
                float distance = x * x + y * y;
                int index = (y + radiusInt) * size + (x + radiusInt);
                data[index] = (float) Math.exp(-distance / sigma22) / sigmaPi2;
                total += data[index];
            }
        }

        for (int i = 0; i < data.length; i++) {
            data[i] /= total;
        }

        Kernel kernel = new Kernel(size, size, data);
        ConvolveOp op = new ConvolveOp(kernel, ConvolveOp.EDGE_ZERO_FILL, null);

        int padding = radiusInt;
        int paddedWidth = image.getWidth() + 2 * padding;
        int paddedHeight = image.getHeight() + 2 * padding;

        BufferedImage paddedImage = new BufferedImage(paddedWidth, paddedHeight, image.getType());
        Graphics2D g = paddedImage.createGraphics();

        g.drawImage(image, padding, padding, null);
        g.drawImage(image, 0, padding, padding, image.getHeight() + padding, 0, 0, padding, image.getHeight(), null);
        g.drawImage(image, image.getWidth() + padding, padding, paddedWidth, image.getHeight() + padding, image.getWidth() - padding, 0, image.getWidth(), image.getHeight(), null);
        g.drawImage(image, padding, 0, image.getWidth() + padding, padding, 0, 0, image.getWidth(), padding, null);
        g.drawImage(image, padding, image.getHeight() + padding, image.getWidth() + padding, paddedHeight, 0, image.getHeight() - padding, image.getWidth(), image.getHeight(), null);
        g.dispose();

        BufferedImage blurredPaddedImage = op.filter(paddedImage, null);

        BufferedImage finalImage = blurredPaddedImage.getSubimage(padding, padding, image.getWidth(), image.getHeight());
        return finalImage;
    }

}
