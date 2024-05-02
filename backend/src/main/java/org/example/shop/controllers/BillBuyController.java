package org.example.shop.controllers;

import jakarta.transaction.Transactional;
import org.example.shop.entities.Bill;
import org.example.shop.entities.Buy;
import org.example.shop.models.*;
import org.example.shop.repo.BillRepo;
import org.example.shop.repo.BuyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bill")
public class BillBuyController {
    @Autowired
    private BillRepo billRepo;

    @Autowired
    private BuyRepo buyRepo;

    @PostMapping("/create/bill")
    public ResponseEntity<Boolean> createBill(@RequestBody BillRequest billRequest) {
        try {
            Bill bill = new Bill();
            bill.setFullName(billRequest.getFullName());
            bill.setPhone(billRequest.getPhone());
            bill.setAddress(billRequest.getAddress());
            bill.setUserId(billRequest.getUserId());
            bill.setSum(billRequest.getSum());
            bill.setId(billRequest.getBillId());
            billRepo.save(bill);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }
// tao san pham cho hoa don

    @PostMapping("/create/buy")
    public ResponseEntity<Boolean> createBuy(@RequestBody List<BuyRequest> buyRequests) {
        try {
            for (BuyRequest request : buyRequests) {
                Buy buy = new Buy();
                buy.setSize(request.getSize());
                buy.setColorPid(request.getColor());
                buy.setImage(request.getImage());
                buy.setPrice(request.getPrice());
                buy.setQuantity(request.getQuantity());
                buy.setProductName(request.getName());
                buy.setProductId(request.getProductId());
                Optional<Bill>  bill =  billRepo.findById(request.getBillId());
                buy.setBill(bill.get());
                buyRepo.save(buy);
            }

            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<BillResponse>> getAll() {
        try {
            List<BillResponse> billResponseList = new ArrayList<>();
            List<Bill>bills = billRepo.findAll();
            for (Bill bill : bills) {
            BillResponse  billResponse = new BillResponse();
            billResponse.setBill(bill);
            List<Buy> buys = buyRepo.findByBillId(bill.getId());
            billResponse.setBuyList(buys);
            billResponseList.add(billResponse);
            }
            return ResponseEntity.ok(billResponseList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/userId")
    public ResponseEntity<List<BillResponse>> getByUserId(@RequestParam("userId") String userId) {
        try {
            List<BillResponse> billResponseList = new ArrayList<>();
            List<Bill>bills = billRepo.findByUserId(userId);
            for (Bill bill : bills) {
                BillResponse  billResponse = new BillResponse();
                billResponse.setBill(bill);
                List<Buy> buys = buyRepo.findByBillId(bill.getId());
                billResponse.setBuyList(buys);
                billResponseList.add(billResponse);
            }
            return ResponseEntity.ok(billResponseList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @GetMapping("/get/fullName")
    public ResponseEntity<List<BillResponse>> getBillWithFullName(@RequestParam("fullName") String fullName) {
        try {
            List<BillResponse> billResponseList = new ArrayList<>();
            List<Bill>bills = billRepo.findByFullNameContaining(fullName);
            for (Bill bill : bills) {
                BillResponse  billResponse = new BillResponse();
                billResponse.setBill(bill);
                List<Buy> buys = buyRepo.findByBillId(bill.getId());
                billResponse.setBuyList(buys);
                billResponseList.add(billResponse);
            }
            return ResponseEntity.ok(billResponseList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PutMapping("/received")
    public ResponseEntity<Boolean> receivedBill(@RequestBody Long id) {
        try {
            Bill bill = billRepo.findById(id).get();
            bill.setReceived(true);
            billRepo.save(bill);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Transactional
     @DeleteMapping("/delete")
        public ResponseEntity<Boolean> deleteBill(@RequestParam("id") Long id) {
            try {
                buyRepo.deleteByBillId(id);
                billRepo.deleteById(id);
                return ResponseEntity.ok(true);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(false);
            }
        }

    @PostMapping(value = "/pdf",produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> exportBillsAsPdf(@RequestBody Long billId)  {
        Optional<Bill> bills = billRepo.findById(billId);
        List<Buy> buys = buyRepo.findByBillId(bills.get().getId());
        byte[] pdfBytes = generatePdf(bills.get() , buys);
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }


    private byte[] generatePdf(Bill bills , List<Buy> buys ) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);
            document.open();
            document.add(new Paragraph("THONG TIN HOA DON"));
            document.add(new Paragraph("Ma  hoa don : " + bills.getId()));
            document.add(new Paragraph("Khach hang: " + bills.getFullName()));
            document.add(new Paragraph("Dia chi: " + bills.getAddress()));
            document.add(new Paragraph("So dien thoai: " + bills.getPhone()));
            for (Buy buy : buys) {
                document.add(new Paragraph("------------------------------------------------------------"));
                document.add(new Paragraph("Ten San pham:"+buy.getProductName()))  ;
                document.add(new Paragraph("So luong: " + buy.getQuantity()));
                document.add(new Paragraph("Kich co: " + buy.getSize()));
                document.add(new Paragraph("Mau Sac: " + buy.getColorPid()));
                document.add(new Paragraph("Don gia: " + buy.getPrice()));

            }
            document.add(new Paragraph("Ngay: " + bills.getCreatedAt()));
            document.add(new Paragraph("Tong cong: " +bills.getSum()));
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return outputStream.toByteArray();

    }






}
