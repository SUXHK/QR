package cn.rivamed.zxing;

import com.google.zxing.BinaryBitmap;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.HashMap;

public class ReadQRCode {

	public static void main(String[] args) {
		try {
			MultiFormatReader formatReader=new MultiFormatReader();
			File file=new File("C:\\Users\\John\\Desktop\\QQR.png");
			BufferedImage image=ImageIO.read(file);
			BinaryBitmap binaryBitmap=new BinaryBitmap(new HybridBinarizer(new BufferedImageLuminanceSource(image)));

			HashMap hints=new HashMap();
			hints.put(EncodeHintType.CHARACTER_SET, "utf-8");//编码

			Result result=formatReader.decode(binaryBitmap, hints);
			System.out.println("解析结果:"+result.toString());
			System.out.println("二维码格式类型:"+result.getBarcodeFormat());
			System.out.println("二维码文本:"+result.getText());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
