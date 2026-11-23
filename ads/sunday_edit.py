from PIL import Image, ImageDraw, ImageFont
FD="/home/claude/ads/fonts/Mukta-{}.ttf"
def F(w,s): return ImageFont.truetype(FD.format(w), s, layout_engine=ImageFont.Layout.RAQM)
def fillrows(im,y0,y1,x0=30,x1=1065):
    px=im.load()
    for y in range(y0,y1):
        L=px[20,y]; R=px[1072,y]
        for x in range(x0,x1):
            t=(x-20)/1052
            px[x,y]=tuple(int(L[i]*(1-t)+R[i]*t) for i in range(3))
def darkest(im,box):
    c=im.crop(box); return min(c.getdata(), key=sum)
def fit(text,weight,target_w):
    d=ImageDraw.Draw(Image.new('RGB',(10,10)))
    for s in range(40,120):
        if d.textlength(text,font=F(weight,s))>=target_w: return s
    return 120
def band(im):
    navy=darkest(im,(64,1180,700,1230))
    fillrows_band(im)
    d=ImageDraw.Draw(im)
    d.text((64,1174),"या रविवारी सकाळी 11 वा. · मोफत मराठी LIVE",font=F('ExtraBold',40),fill=(20,33,61))
    return navy
def fillrows_band(im):
    px=im.load()
    for y in range(1163,1233):
        c=px[1060,y]
        for x in range(30,1050): px[x,y]=c
def label(im):
    fillrows(im,48,108)
    ImageDraw.Draw(im).text((64,55),"FinPick Sunday Live",font=F('Bold',34),fill=(242,163,101))
# Nikhil
im=Image.open('satlive-nik-this-sat-nocity.jpg').convert('RGB')
navy=darkest(im,(64,1180,700,1230)); print('navy',navy)
s=fit("नमस्कार! या शनिवारी तुमच्या",'ExtraBold',804); print('size',s)
fillrows(im,48,310)
d=ImageDraw.Draw(im)
d.text((64,55),"FinPick Sunday Live",font=F('Bold',34),fill=(242,163,101))
d.text((64,118),"नमस्कार! या रविवारी तुमच्या",font=F('ExtraBold',s),fill=(255,255,255))
d.text((64,118+int(s*1.17)),"health policy बद्दल बोलूया.",font=F('ExtraBold',s),fill=(255,255,255))
band(im); im.save('sunlive-nik-nocity.jpg',quality=93)
im=Image.open('satlive-ad3-this-sat.jpg').convert('RGB')
label(im); band(im); im.save('sunlive-ad3-parents.jpg',quality=93)
