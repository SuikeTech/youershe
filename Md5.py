import hashlib
import os
import time

# 1.获取文件MD5值
def get_md5(file_name,path):
    with open(os.path.join(path,file_name),'rb') as f:
        md5obj = hashlib.md5()
        md5obj.update(f.read())
        hash = md5obj.hexdigest()
    #print(hash,type(hash))
    return  hash[0:6]

#2.找出当前的文件的后缀名
def file_type(file):
    filename = file.split('.')[0]
    filetype = file.split('.')[-1]
    #print(filename,filetype)
    return filetype


#3.主函数:查找目标目录下的所有文件,并使用MD5值及后缀名重命名当前文件
def main(path):
    winerror = []
    for root,dirlist,filelist in os.walk(path):
        for file in filelist:
            if file_type(file) == 'py':
                continue
            newname =  '{0}.{1}.{2}'.format(file.split('.')[0],get_md5(file,path), file_type(file))
            print(newname)
            try:
                if os.path.join(path,newname) == os.path.join(path,file):
                    pass
                else:
                    print('Now Renaming:', file, 'To', newname)
                    os.rename(os.path.join(path,file),os.path.join(path,newname))
            except WindowsError:
                nickname = '{0}.{1}'.format(str(len(winerror)),file_type(file))
                print('WindowsError for:',file, 'Renaming to:', nickname)
                winerror.append(file)
                os.rename(os.path.join(path,file),os.path.join(path,nickname))
    print(winerror)
    print(len(winerror))



#4.执行
path = r'.\pixi'
if __name__ == '__main__':
    starttime = time.time()
    main(path)
    endtime = time.time()
    usetime = endtime - starttime
    print('总计用时:', usetime, 's')